import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors({
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger / OpenAPI
  const config = new DocumentBuilder()
    .setTitle('AthleteCare Pro API')
    .setDescription('Production-grade fitness, wellness, coaching & e-commerce API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Authentication & authorization')
    .addTag('Users', 'User management')
    .addTag('Clients', 'Client profiles & onboarding')
    .addTag('Coaches', 'Coach profiles & management')
    .addTag('Workouts', 'Workout plans & tracking')
    .addTag('Nutrition', 'Diet plans & meal tracking')
    .addTag('Products', 'E-commerce product catalog')
    .addTag('Orders', 'Cart, checkout & order management')
    .addTag('Subscriptions', 'Subscription plans & billing')
    .addTag('AI', 'AI Coach assistant')
    .addTag('Admin', 'Admin dashboard & management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Start server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 AthleteCare Pro API running on port ${port}`);
  console.log(`📖 API Docs: http://localhost:${port}/api/docs`);
}

bootstrap();
