import { ApiProperty } from "@nestjs/swagger";

export class AddCourseToStudentDto {
  @ApiProperty()
  studentId: number;
  @ApiProperty()
  courseId: number;
}
