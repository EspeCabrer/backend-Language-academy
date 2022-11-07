import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/course/entities/course.entity";
import { Repository } from "typeorm";
import { AddCourseToStudentDto } from "./dto/addCourse-student-dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(newStudent);
  }

  async addCourse(addCourseToStudentDto: AddCourseToStudentDto) {
    const { studentId, courseId } = addCourseToStudentDto;
    const course = await this.courseRepository.findOneBy({ id: courseId });
    const student: Student = await this.studentRepository
      .createQueryBuilder("student")
      .leftJoinAndSelect("student.courses", "Course")
      .where("student.id = :studentId", { studentId })
      .getOne();

    student.courses.push(course);

    return this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find();
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOneBy({ id: id });
    student.firstName = updateStudentDto.firstName;
    student.lastName = updateStudentDto.lastName;
    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOneBy({ id: id });
    return this.studentRepository.remove(student);
  }
}
