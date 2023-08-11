import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserUpdateDto } from './dto/user.update.dto';
import { UpdateUserHandler } from './handlers/update-user';
import { CreateUserDto } from './dto/user.create.dto';
import { UserGetDto } from './dto/user.get.dto';
import { userTransform } from './transforms/user.transform';
import { QueryGetUsersDto } from './dto/query-get-users.dto';
import { QueryGetUsersHandlers } from './handlers/query-get-users';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get list users' })
  @ApiResponse({ description: 'All users', type: UserGetDto, isArray: true })
  @ApiQuery({ name: 'pagination[limit]', required: false })
  @ApiQuery({ name: 'pagination[offset]', required: false })
  @ApiQuery({ name: 'filters[phone]', required: false })
  @ApiQuery({ name: 'filters[email]', required: false })
  @ApiQuery({ name: 'filters[firstName]', required: false })
  async getAll(@Query() query?: QueryGetUsersDto) {
    const { users, count } = await this.usersService.findAll(
      new QueryGetUsersHandlers(query || {}),
    );
    return { users: users.map((user) => userTransform(user)), count };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ description: 'Get user', type: UserGetDto })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const user = await this.usersService.findOne(id);
    return userTransform(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ description: 'User updated', type: UserGetDto })
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() body: UserUpdateDto) {
    const user = await this.usersService.update(id, new UpdateUserHandler(body));
    return userTransform(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ description: 'New user', type: UserGetDto })
  async create(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return userTransform(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ description: 'User deleted', type: UserGetDto })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const user = await this.usersService.remove(id);
    return userTransform(user);
  }
}
