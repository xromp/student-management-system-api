import { IsNotEmpty } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  name: string;
}
