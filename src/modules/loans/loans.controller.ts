import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@ApiTags('loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo empréstimo' })
  @ApiResponse({ status: 201, description: 'Empréstimo criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Livro não disponível ou limite de empréstimos atingido' })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os empréstimos' })
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um empréstimo pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do empréstimo' })
  @ApiResponse({ status: 404, description: 'Empréstimo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um empréstimo' })
  @ApiParam({ name: 'id', description: 'ID do empréstimo' })
  @ApiResponse({ status: 404, description: 'Empréstimo não encontrado' })
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um empréstimo' })
  @ApiParam({ name: 'id', description: 'ID do empréstimo' })
  @ApiResponse({ status: 204, description: 'Empréstimo removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Empréstimo não encontrado' })
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }

  // FUNCIONALIDADES EXTRAS - SISTEMA DE MULTAS

  @Post(':id/return')
  @ApiOperation({ summary: 'Registrar devolução de livro com cálculo de multa' })
  @ApiParam({ name: 'id', description: 'ID do empréstimo' })
  @ApiResponse({ status: 200, description: 'Devolução registrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Empréstimo não encontrado' })
  @ApiResponse({ status: 400, description: 'Livro já devolvido' })
  returnBook(@Param('id') id: string) {
    return this.loansService.returnBook(+id);
  }

  @Post('fines/calculate-overdue')
  @ApiOperation({ summary: 'Calcular multas automáticas para empréstimos atrasados' })
  @ApiResponse({ status: 200, description: 'Multas calculadas com sucesso' })
  calculateOverdueFines() {
    return this.loansService.calculateOverdueFines();
  }

  @Get('member/:memberId')
  @ApiOperation({ summary: 'Listar empréstimos ativos de um membro' })
  @ApiParam({ name: 'memberId', description: 'ID do membro' })
  getMemberLoans(@Param('memberId') memberId: string) {
    return this.loansService.getMemberLoans(+memberId);
  }

  @Get('reports/overdue')
  @ApiOperation({ summary: 'Listar todos os empréstimos atrasados' })
  getOverdueLoans() {
    return this.loansService.getOverdueLoans();
  }
}