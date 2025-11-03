import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: createAuthorDto,
    });
  }

  async findAll() {
    return this.prisma.author.findMany();
  }

  async findOne(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  }

  async remove(id: number) {
    return this.prisma.author.delete({
      where: { id },
    });
  }

   async findByCountry(country: string) {
    return this.prisma.author.findMany({
      where: {
        country: {
          contains: country,
          mode: 'insensitive'
        }
      },
    });
  }
}