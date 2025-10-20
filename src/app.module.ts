import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsModule } from './modules/authors/authors.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [AuthorsModule, CategoriesModule],
  providers: [PrismaService],
})
export class AppModule {}
