import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
