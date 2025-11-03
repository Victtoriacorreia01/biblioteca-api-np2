import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { LoansRepository } from './loans.repository';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanStatus } from './dto/update-loan.dto';

@Injectable()
export class LoansService {
  constructor(private readonly loansRepository: LoansRepository) {}

  async create(createLoanDto: CreateLoanDto) {
    // Verificar se o livro está disponível
    const isBookAvailable = await this.loansRepository.checkBookAvailability(createLoanDto.bookId);
    if (!isBookAvailable) {
      throw new ConflictException('Livro não disponível para empréstimo');
    }

    // Verificar se o membro está ativo e não tem muitos empréstimos
    const activeLoans = await this.loansRepository.findActiveLoansByMember(createLoanDto.memberId);
    if (activeLoans.length >= 3) {
      throw new ConflictException('Membro atingiu o limite de 3 empréstimos ativos');
    }

    // Decrementar cópias disponíveis
    await this.loansRepository.decrementBookCopies(createLoanDto.bookId);

    // Criar empréstimo
    return this.loansRepository.create(createLoanDto);
  }

  async findAll() {
    return this.loansRepository.findAll();
  }

  async findOne(id: number) {
    const loan = await this.loansRepository.findOne(id);
    if (!loan) {
      throw new NotFoundException(`Empréstimo com ID ${id} não encontrado`);
    }
    return loan;
  }

  async update(id: number, updateLoanDto: UpdateLoanDto) {
    await this.findOne(id); // Verifica se existe
    return this.loansRepository.update(id, updateLoanDto);
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    
    const loan = await this.loansRepository.findOne(id);
    if (loan && !loan.returnDate) {
      // Devolver livro ao estoque se ainda não foi devolvido
      await this.loansRepository.incrementBookCopies(loan.bookId);
    }

    return this.loansRepository.remove(id);
  }

  // FUNCIONALIDADE EXTRA: SISTEMA DE MULTAS AUTOMÁTICAS

  async returnBook(loanId: number) {
    const loan = await this.findOne(loanId);
    
    if (loan.returnDate) {
      throw new BadRequestException('Este livro já foi devolvido');
    }

    const returnDate = new Date();
    let fineCents = 0;

    // Calcular multa se estiver atrasado
    if (returnDate > loan.dueDate) {
      const daysLate = Math.ceil((returnDate.getTime() - loan.dueDate.getTime()) / (1000 * 60 * 60 * 24));
      fineCents = daysLate * 200; // R$ 2,00 por dia de atraso
    }

    // Atualizar empréstimo
    const updatedLoan = await this.loansRepository.update(loanId, {
      returnDate: returnDate.toISOString(),
      status: LoanStatus.RETURNED,
      fineCents
    });

    // Devolver livro ao estoque
    await this.loansRepository.incrementBookCopies(loan.bookId);

    return updatedLoan;
  }

  async calculateOverdueFines() {
    const overdueLoans = await this.loansRepository.findOverdueLoans();
    const today = new Date();

    for (const loan of overdueLoans) {
      const daysLate = Math.ceil((today.getTime() - loan.dueDate.getTime()) / (1000 * 60 * 60 * 24));
      const fineCents = daysLate * 200; // R$ 2,00 por dia

      // Atualizar status para LATE e aplicar multa
      await this.loansRepository.updateLoanStatus(loan.id, LoanStatus.LATE);
      await this.loansRepository.updateFine(loan.id, fineCents);
    }

    return {
      message: `Multas calculadas para ${overdueLoans.length} empréstimos atrasados`,
      updatedLoans: overdueLoans.length
    };
  }

  async getMemberLoans(memberId: number) {
    return this.loansRepository.findActiveLoansByMember(memberId);
  }

  async getOverdueLoans() {
    return this.loansRepository.findOverdueLoans();
  }
}