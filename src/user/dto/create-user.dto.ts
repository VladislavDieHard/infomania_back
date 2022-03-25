import { UserRoleType } from '../user-role.type';

export type CreateUserDto = {
  username: string,
  password: string,
  role: UserRoleType
}