import { IsOptional, IsString, ValidateNested, IsEmail } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginationDto } from '../../../common/validation';

export class FilterGetUsersDto {
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
  @Type(() => FilterGetUsersDto)
  @Expose()
  filters?: FilterGetUsersDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  @Expose()
  pagination?: PaginationDto;
}
