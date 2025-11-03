import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany({
      orderBy: { registeredAt: 'desc' }
    });
  }

  async findOne(id: number): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.prisma.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  async remove(id: number): Promise<Member> {
    return this.prisma.member.delete({
      where: { id },
    });
  }

  async deactivate(id: number): Promise<Member> {
    return this.prisma.member.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getActiveMembersCount(): Promise<number> {
    return this.prisma.member.count({
      where: { isActive: true }
    });
  }
}