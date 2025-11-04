import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';
import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export enum LoanStatus {
  OPEN = 'OPEN',
  RETURNED = 'RETURNED', 
  LATE = 'LATE'
}

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  @ApiProperty({ description: 'Data de devolução', required: false })
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @ApiProperty({ enum: LoanStatus, description: 'Status do empréstimo', required: false })
  @IsOptional()
  @IsEnum(LoanStatus)
  status?: LoanStatus;

  @ApiProperty({ description: 'Multa em centavos', required: false })
  @IsOptional()
  fineCents?: number;
}