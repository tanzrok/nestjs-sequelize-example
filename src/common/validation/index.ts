import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  readonly limit: number;

  @Type(() => Number)
  @IsNumber()
  readonly offset: number;
}
