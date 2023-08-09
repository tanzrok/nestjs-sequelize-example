import { User } from '../../../models/user.model';
import { encryptPassword } from '../../../common/tools/password';
import { CreateUserDto } from '../dto/user.create.dto';

export class CreateUserHandler {
  readonly user: User = new User();

  constructor(create: CreateUserDto) {
    this.user.lastName = create.lastName;
    this.user.firstName = create.firstName;
    this.user.phone = create.phone;
    this.user.password = encryptPassword(create.password);
  }
}
