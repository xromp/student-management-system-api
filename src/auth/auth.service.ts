import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const account = await this.userService.findOne({
      userName: email,
    });
    if (account) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        account?.passwordHash,
      );
      if (isPasswordMatch) {
        const { passwordHash, ...result } = account.toObject();
        return result;
      }
    }
    return null;
  }

  async login(currentUser: any) {
    const payload = {
      sub: currentUser,
      roles: [currentUser?.role],
    };
    return {
      authToken: this.jwtService.sign(payload),
      currentUser,
    };
  }
}
