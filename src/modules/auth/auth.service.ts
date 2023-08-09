import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models/user.model';
import { CreateUserHandler } from '../users/handlers/create-user';
import { encryptPassword } from '../../common/tools/password';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signup.dto';
import { UserValidationException } from '../users/exceptions/user-validation.exception';

type TLogin = 'phone' | 'email';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private createToken(userId: number): string {
    const jwtSecret = this.configService.get<string>('jwt.secret');
    return this.jwtService.sign({ userId }, { secret: jwtSecret, expiresIn: '30m' });
  }

  private async findByContact(contact: string, type: TLogin): Promise<User> {
    return this.userModel.findOne({ where: { [type]: contact } });
  }

  async signIn(login: string, password: string) {
    let type: TLogin = 'phone';
    if (login.includes('@')) type = 'email';
    const user = await this.findByContact(login, type);

    if (!user || user.password !== encryptPassword(password)) {
      throw new BadRequestException("User doesn't exist or password is invalid");
    }

    return this.createToken(user.id);
  }

  async signUp(body: SignUpDto) {
    try {
      const { user } = new CreateUserHandler(body);
      const newUser = await user.save();
      return this.createToken(newUser.id);
    } catch (error) {
      if (error?.errors?.length) {
        throw new UserValidationException(error.errors);
      }
    }
  }
}
