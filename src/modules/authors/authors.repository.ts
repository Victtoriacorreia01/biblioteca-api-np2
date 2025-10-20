import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthorsRepository {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.AuthorCreateInput) { return this.prisma.author.create({ data }); }
  findAll() { return this.prisma.author.findMany(); }
  findOne(id: number) { return this.prisma.author.findUnique({ where: { id } }); }
  update(id: number, data: Prisma.AuthorUpdateInput) { return this.prisma.author.update({ where: { id }, data }); }
  remove(id: number) { return this.prisma.author.delete({ where: { id } }); }
}
