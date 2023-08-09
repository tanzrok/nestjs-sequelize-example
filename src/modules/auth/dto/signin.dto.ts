import { IsDefined, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberPhoneOrEmail } from '../../../common/tools/email-or-phone';

export class SignInDto {
  @IsString()
  @Validate(IsNumberPhoneOrEmail)
  login: string;

  @IsString()
  @ApiProperty()
  password: string;
}
