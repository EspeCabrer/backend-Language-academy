import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CourseService } from "./course.service";
import { Course } from "./entities/course.entity";

@ApiTags("course")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get("student/:id")
  findByStudent(@Param("id") id: string): Promise<Course[]> {
    return this.courseService.findByStudent(id);
  }
}
