import { IsOptional, IsString, ValidateNested, IsEmail } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginationDto } from '../../../common/validation';

export class filterGetUsersDto {
  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;
}

export class QueryGetUsersDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => filterGetUsersDto)
  @Expose()
  filters?: filterGetUsersDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  @Expose()
  pagination?: PaginationDto;
}
