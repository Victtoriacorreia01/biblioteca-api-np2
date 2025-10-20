import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private repo: AuthorsRepository) {}

  create(dto: CreateAuthorDto) { return this.repo.create(dto); }
  findAll() { return this.repo.findAll(); }
  async findOne(id: number) {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException('Autor não encontrado');
    return found;
  }
  async update(id: number, dto: UpdateAuthorDto) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }
  async remove(id: number) {
    await this.findOne(id);
    try { return await this.repo.remove(id); }
    catch { throw new BadRequestException('Não foi possível remover o autor'); }
  }
}
