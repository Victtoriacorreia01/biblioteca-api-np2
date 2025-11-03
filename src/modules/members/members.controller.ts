import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo membro' })
  @ApiResponse({ status: 201, description: 'Membro criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os membros' })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um membro pelo ID' })
  @ApiResponse({ status: 404, description: 'Membro não encontrado' })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um membro' })
  @ApiResponse({ status: 404, description: 'Membro não encontrado' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um membro' })
  @ApiResponse({ status: 204, description: 'Membro removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Membro não encontrado' })
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Desativar um membro' })
  @ApiResponse({ status: 200, description: 'Membro desativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Membro não encontrado' })
  deactivate(@Param('id') id: string) {
    return this.membersService.deactivate(+id);
  }

  @Get('reports/active-members')
  @ApiOperation({ summary: 'Relatório de membros ativos' })
  getMembersReport() {
    return this.membersService.getMembersReport();
  }
}