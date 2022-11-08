import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findByStudent(id): Promise<Course[]> {
    return await this.courseRepository
      .createQueryBuilder("course")
      .leftJoin("course.students", "students")
      .where("students.id = :id", { id: id })
      .getMany();
  }
}
