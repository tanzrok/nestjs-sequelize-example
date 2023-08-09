import { BadRequestException } from '@nestjs/common';

export class UserValidationException extends BadRequestException {
  constructor(error) {
    const ValidationErrorItem = error[0];
    super({ message: ValidationErrorItem.message });
  }
}
