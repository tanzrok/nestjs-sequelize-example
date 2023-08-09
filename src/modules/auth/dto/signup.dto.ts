import { CreateUserDto } from '../../users/dto/user.create.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto implements CreateUserDto {
  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsString()
  @ApiProperty()
  password: string;
}
