import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from 'src/lib/role/role.enum';
export class CreateStudentDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
