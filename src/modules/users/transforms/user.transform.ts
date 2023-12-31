import { User } from '../../../models/user.model';
import { GetUserHandlers } from '../handlers/get-user';

export function userTransform(user: User | null) {
  if (!user) return null;
  return new GetUserHandlers(user);
}
