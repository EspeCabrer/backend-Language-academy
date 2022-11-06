import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
