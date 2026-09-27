import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LogHydrationDto {
  @ApiProperty({ example: 500, description: 'Volume of fluid consumed in milliliters' })
  @IsNumber()
  @Min(50)
  @Max(3000)
  amountMl: number;

  @ApiPropertyOptional({ example: 'Water + Electrolytes', description: 'Beverage description' })
  @IsOptional()
  @IsString()
  beverage?: string;

  @ApiPropertyOptional({ example: 3500, description: 'Optional daily hydration target in ml' })
  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(8000)
  targetMl?: number;
}
