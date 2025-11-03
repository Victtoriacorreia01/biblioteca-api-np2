import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsModule } from './modules/authors/authors.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MembersModule } from './modules/members/members.module';
import { LoansModule } from './modules/loans/loans.module';

@Module({
  imports: [AuthorsModule, CategoriesModule, MembersModule, LoansModule],
  providers: [PrismaService], 
})
export class AppModule {}
