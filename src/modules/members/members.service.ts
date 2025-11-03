import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly membersRepository: MembersRepository) {}

  async create(createMemberDto: CreateMemberDto) {
    // Verificar se email já existe
    const existingMember = await this.membersRepository.findByEmail(createMemberDto.email);
    if (existingMember) {
      throw new ConflictException('Email já cadastrado');
    }

    return this.membersRepository.create(createMemberDto);
  }

  async findAll() {
    return this.membersRepository.findAll();
  }

  async findOne(id: number) {
    const member = await this.membersRepository.findOne(id);
    if (!member) {
      throw new NotFoundException(`Membro com ID ${id} não encontrado`);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.findOne(id); // Verifica se existe
    
    // Se estiver atualizando email, verificar duplicata
    if (updateMemberDto.email) {
      const existingMember = await this.membersRepository.findByEmail(updateMemberDto.email);
      if (existingMember && existingMember.id !== id) {
        throw new ConflictException('Email já cadastrado');
      }
    }

    return this.membersRepository.update(id, updateMemberDto);
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return this.membersRepository.remove(id);
  }

  async deactivate(id: number) {
    await this.findOne(id); // Verifica se existe
    return this.membersRepository.deactivate(id);
  }

  // FUNCIONALIDADE EXTRA - Relatório de membros ativos
  async getMembersReport() {
    const totalMembers = await this.membersRepository.findAll();
    const activeMembersCount = await this.membersRepository.getActiveMembersCount();
    
    return {
      totalMembers: totalMembers.length,
      activeMembers: activeMembersCount,
      inactiveMembers: totalMembers.length - activeMembersCount,
      lastRegistered: totalMembers.slice(0, 5) // Últimos 5 cadastrados
    };
  }
}