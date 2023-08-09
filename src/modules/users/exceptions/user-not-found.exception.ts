import { NotFoundException } from '@nestjs/common';

export class UserNotFoundById extends NotFoundException {
  constructor(userId: number) {
    super(`User with id: ${userId} not found`);
  }
}
