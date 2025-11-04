import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class QueryBookDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  title?: string;

  @Type(() => Number)
  @ApiPropertyOptional() @IsOptional() @IsInt() 
  authorId?: number;

  @Type(() => Number)
  @ApiPropertyOptional() @IsOptional() @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Se "true", retorna apenas livros com availableCopies > 0' })
  @IsOptional() @IsBooleanString()
  availableOnly?: string; 
}
