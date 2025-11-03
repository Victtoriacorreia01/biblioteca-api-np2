import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { LoansRepository } from './loans.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [LoansController],
  providers: [LoansService, LoansRepository],
  exports: [LoansService],
})
export class LoansModule {}