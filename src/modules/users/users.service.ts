import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user.model';
import { UpdateUserHandler } from './handlers/update-user';
import { CreateUserDto } from './dto/user.create.dto';
import { CreateUserHandler } from './handlers/create-user';
import { UserNotFoundById } from './exceptions/user-not-found.exception';
import { UserValidationException } from './exceptions/user-validation.exception';
import { QueryGetUsersHandlers } from './handlers/query-get-users';
import { ValidationError } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  private async findOneOrThrow(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new UserNotFoundById(id);
    return user;
  }

  async findAll(query: QueryGetUsersHandlers): Promise<{ users: User[]; count: number }> {
    const { pagination, filters = {} } = query;
    const { count, rows } = await this.userModel.findAndCountAll({
      limit: pagination.limit,
      offset: pagination.offset,
      where: { ...filters },
    });
    return { users: rows, count };
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userModel.findByPk(id);
  }

  async update(id: number, data: UpdateUserHandler): Promise<User> {
    const user = await this.findOneOrThrow(id);
    try {
      const updatedUser = await user.update(data);
      return updatedUser;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new UserValidationException(error.errors);
      }
    }
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      const { user } = new CreateUserHandler(data);
      const newUser = await user.save();
      return newUser;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new UserValidationException(error.errors);
      }
    }
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneOrThrow(id);
    await user.destroy();
    return user;
  }
}
