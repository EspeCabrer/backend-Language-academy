import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teacher } from "./entities/teacher.entity";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>
  ) {}

  create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const newTeacher: Teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(newTeacher);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto
  ): Promise<Teacher> {
    const teacher: Teacher = await this.teacherRepository.findOneBy({ id: id });
    teacher.firstName = updateTeacherDto.firstName;
    teacher.lastName = updateTeacherDto.lastName;
    return this.teacherRepository.save(teacher);
  }

  async remove(id: number): Promise<Teacher> {
    const teacher: Teacher = await this.teacherRepository.findOneBy({ id: id });
    return this.teacherRepository.remove(teacher);
  }
}
