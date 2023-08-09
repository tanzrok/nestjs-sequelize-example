import {
  ValidationArguments,
  ValidatorConstraint,
  isPhoneNumber,
  isEmail as isEmailValid,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'email-or-phone', async: false })
export class IsNumberPhoneOrEmail implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    const isPhone = isPhoneNumber(text, 'RU');
    const isEmail = isEmailValid(text);

    return isPhone || isEmail;
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be phone number or email';
  }
}
