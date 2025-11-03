import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { LoansRepository } from './loans.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [LoansController],
  providers: [LoansService, LoansRepository, PrismaService],
  exports: [LoansService],
})
export class LoansModule {}