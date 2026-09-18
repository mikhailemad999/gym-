import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thread } from './entities/thread.entity';
import { Message } from './entities/message.entity';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getOrCreateThread(athleteId: string, coachId: string): Promise<Thread> {
    let thread = await this.threadRepository.findOne({
      where: { athleteId, coachId },
      relations: { athlete: true, coach: true },
    });

    if (!thread) {
      thread = this.threadRepository.create({
        athleteId,
        coachId,
        title: 'Direct Telemetry Channel',
      });
      thread = await this.threadRepository.save(thread);
    }
    return thread;
  }

  async getUserThreads(userId: string): Promise<Thread[]> {
    return this.threadRepository.find({
      where: [{ athleteId: userId }, { coachId: userId }],
      relations: { athlete: true, coach: true, messages: true },
      order: { lastMessageAt: 'DESC' },
    });
  }

  async getThreadMessages(threadId: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: { threadId },
      order: { createdAt: 'ASC' },
      relations: { sender: true },
    });
  }

  async sendMessage(threadId: string, senderId: string, dto: SendMessageDto): Promise<Message> {
    const thread = await this.threadRepository.findOne({ where: { id: threadId } });
    if (!thread) throw new NotFoundException('Thread not found');

    const message = this.messageRepository.create({
      threadId,
      senderId,
      content: dto.content,
      telemetryPayload: dto.telemetryPayload,
    });
    const saved = await this.messageRepository.save(message);

    thread.lastMessageAt = new Date();
    await this.threadRepository.save(thread);

    return saved;
  }
}
