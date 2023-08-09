import { encryptPassword } from '../../../common/tools/password';
import { UserUpdateDto } from '../dto/user.update.dto';

export class UpdateUserHandler {
  readonly email: string;
  readonly phone: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;

  constructor(update: UserUpdateDto) {
    this.firstName = update.firstName;
    this.lastName = update.lastName;
    this.email = update.email;
    this.phone = update.phone;
    this.password = encryptPassword(update.password);
  }
}
