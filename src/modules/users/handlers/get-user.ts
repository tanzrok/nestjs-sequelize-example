import { User } from '../../../models/user.model';

export class GetUserHandlers {
  readonly id: number;
  readonly email: string;
  readonly phone: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(user: User) {
    this.id = Number(user.id);
    this.email = user.email;
    this.phone = user.phone;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
