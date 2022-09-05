import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from 'src/role/role.enum';
export class CreateStudentDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: `Role must be either 'teacher' or 'administrator'.`,
  })
  role: Role;
}
