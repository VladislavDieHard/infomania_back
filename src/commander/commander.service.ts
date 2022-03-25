import { Injectable } from '@nestjs/common';
import { _cli, Command, CommandArguments } from '@squareboat/nest-console';
import { UserService } from '../user/user.service';
import { UserRoleType } from '../user/user-role.type';

@Injectable()
export class CommandService {
  constructor(private userService: UserService) {}

  @Command('create:user', {
    desc: 'Create user command',
    // args: { name: { req: false } },
  })
  async createUserCommand (args: CommandArguments) {
    const user = {
      username: await _cli.ask('Username:'),
      password: await _cli.ask('Password:'),
      repeatPassword: await _cli.ask('Repeat password:')
    }
    const existedUser = await this.userService.getOneUserByName(user.username);
    if (existedUser === undefined) {
      const newUser = await this.userService.createUser({
        ...user,
        role: UserRoleType.Admin
      });
      _cli.success(`Created user with name: ${newUser.username}`);
    } else {
      _cli.error(`User with name: ${user.username}, already exists!`);
    }
    return;
  }
}