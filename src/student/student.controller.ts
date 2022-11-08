import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AddCourseToStudentDto } from "./dto/addCourse-student-dto";

@ApiTags("student")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post("add-course")
  addCourse(@Body() addCourseToStudentDto: AddCourseToStudentDto) {
    return this.studentService.addCourse(addCourseToStudentDto);
  }

  @Get(":id")
  getById(@Param("id") id) {
    return this.studentService.findById(id);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.studentService.remove(+id);
  }
}
