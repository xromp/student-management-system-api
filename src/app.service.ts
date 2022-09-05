import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from './lib/user/user.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private userService: UserService) {}
  getHello(): string {
    return 'Student Management System Api here!';
  }

  onApplicationBootstrap() {
    this.userService.seedInitialUser();
  }
}
