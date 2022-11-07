import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { CourseService } from "src/course/course.service";
import { Course } from "src/course/entities/course.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [StudentController],
  providers: [StudentService, CourseService],
})
export class StudentModule {}
