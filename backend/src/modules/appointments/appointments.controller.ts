import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Appointments')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a new coaching or video telemetry appointment' })
  create(@Request() req: any, @Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(req.user.id, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get current user appointments' })
  findMyAppointments(@Request() req: any) {
    return this.appointmentsService.findByClient(req.user.id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel an existing appointment' })
  cancel(@Request() req: any, @Param('id') id: string) {
    return this.appointmentsService.cancel(id, req.user.id);
  }
}
