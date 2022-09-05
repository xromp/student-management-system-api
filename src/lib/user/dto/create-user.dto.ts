import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/lib/role/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: `Role must be either 'teacher' or 'administrator'.`,
  })
  role: Role;
}
