import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Loan } from './entities/loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanStatus } from './dto/update-loan.dto'; // Import do nosso enum

@Injectable()
export class LoansRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    return this.prisma.loan.create({
      data: {
        ...createLoanDto,
        dueDate: new Date(createLoanDto.dueDate),
      },
      include: {
        member: true,
        book: {
          include: {
            author: true,
            category: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      include: {
        member: true,
        book: {
          include: {
            author: true,
            category: true,
          },
        },
      },
      orderBy: { loanDate: 'desc' },
    });
  }

  async findOne(id: number): Promise<Loan | null> {
    return this.prisma.loan.findUnique({
      where: { id },
      include: {
        member: true,
        book: {
          include: {
            author: true,
            category: true,
          },
        },
      },
    });
  }

  async update(id: number, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    return this.prisma.loan.update({
      where: { id },
      data: {
        ...updateLoanDto,
        ...(updateLoanDto.dueDate && { dueDate: new Date(updateLoanDto.dueDate) }),
        ...(updateLoanDto.returnDate && { returnDate: new Date(updateLoanDto.returnDate) }),
      },
      include: {
        member: true,
        book: {
          include: {
            author: true,
            category: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Loan> {
    return this.prisma.loan.delete({
      where: { id },
    });
  }

  // Métodos para funcionalidades extras
  async findActiveLoansByMember(memberId: number): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      where: {
        memberId,
        status: { in: [LoanStatus.OPEN, LoanStatus.LATE] },
      },
    });
  }

  async updateLoanStatus(id: number, status: LoanStatus): Promise<Loan> {
    return this.prisma.loan.update({
      where: { id },
      data: { status },
    });
  }

  async updateFine(id: number, fineCents: number): Promise<Loan> {
    return this.prisma.loan.update({
      where: { id },
      data: { fineCents },
    });
  }

  async findOverdueLoans(): Promise<Loan[]> {
    const today = new Date();
    return this.prisma.loan.findMany({
      where: {
        dueDate: { lt: today },
        status: LoanStatus.OPEN,
        returnDate: null,
      },
      include: {
        member: true,
        book: true,
      },
    });
  }

  async checkBookAvailability(bookId: number): Promise<boolean> {
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
      select: { availableCopies: true }
    });
    return book ? book.availableCopies > 0 : false;
  }

  async decrementBookCopies(bookId: number): Promise<void> {
    await this.prisma.book.update({
      where: { id: bookId },
      data: { availableCopies: { decrement: 1 } }
    });
  }

  async incrementBookCopies(bookId: number): Promise<void> {
    await this.prisma.book.update({
      where: { id: bookId },
      data: { availableCopies: { increment: 1 } }
    });
  }
}