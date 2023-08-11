import { BadRequestException } from '@nestjs/common';
import { ValidationErrorItem } from 'sequelize/types/errors/validation-error';

export class UserValidationException extends BadRequestException {
  constructor(error: ValidationErrorItem[]) {
    const ValidationErrorItem = error[0];
    super({ message: ValidationErrorItem.message });
  }
}
