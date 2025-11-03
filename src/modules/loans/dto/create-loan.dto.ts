import { IsInt, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty({ description: 'ID do membro' })
  @IsInt()
  memberId: number;

  @ApiProperty({ description: 'ID do livro' })
  @IsInt()
  bookId: number;

  @ApiProperty({ description: 'Data de vencimento do empréstimo' })
  @IsDateString()
  dueDate: string;
}