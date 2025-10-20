import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';
export class CreateAuthorDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsOptional() country?: string;
  @IsInt() @IsOptional() birthYear?: number;
  @IsString() @IsOptional() bio?: string;
}
