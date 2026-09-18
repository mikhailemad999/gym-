import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { StoreService } from './store.service';

@ApiTags('Products')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get dispensary products with optional category filter' })
  @ApiQuery({ name: 'category', type: String, required: false })
  async getProducts(@Query('category') category?: string) {
    const data = await this.storeService.getAllProducts(category);
    return {
      success: true,
      data,
      meta: { count: data.length },
    };
  }

  @Get('products/:slug')
  @ApiOperation({ summary: 'Get single product specifications by slug' })
  async getProduct(@Param('slug') slug: string) {
    const data = await this.storeService.getProductBySlug(slug);
    return {
      success: true,
      data,
    };
  }

  @Post('orders')
  @ApiOperation({ summary: 'Place dispensary checkout order' })
  async placeOrder(@Request() req: any, @Body() body: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.storeService.createOrder(userId, body);
    return {
      success: true,
      message: 'Order created and scheduled for dispatch',
      data,
    };
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get user order history' })
  async getOrders(@Request() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.storeService.getOrders(userId);
    return {
      success: true,
      data,
    };
  }
}
