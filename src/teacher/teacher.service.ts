import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {

  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) { }

  create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(newTeacher);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  async update(id: number,updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherRepository.findOneBy({id: id});
    teacher.firstName = updateTeacherDto.firstName;
    teacher.lastName = updateTeacherDto.lastName;
    return this.teacherRepository.save(teacher);
  }

  async remove(id: number) {
    const teacher = await this.teacherRepository.findOneBy({id: id});
    return this.teacherRepository.remove(teacher);
  }
}
