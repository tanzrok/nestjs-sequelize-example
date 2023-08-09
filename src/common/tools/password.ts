import * as crypto from 'crypto';

export const encryptPassword = (password: string): string => {
  return crypto.createHmac('sha512', 'like').update(password).digest('hex');
};
