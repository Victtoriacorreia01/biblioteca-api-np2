import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private repo: CategoriesRepository) {}

  create(dto: CreateCategoryDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException('Categoria não encontrada');
    return found;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return await this.repo.remove(id);
    } catch {
      throw new BadRequestException('Não foi possível remover a categoria');
    }
  }
}
