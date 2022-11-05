import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) { }

  create(createCourseDto: CreateCourseDto) {
    const newCourse = this.courseRepository.create(createCourseDto)
    return this.courseRepository.save(newCourse);
  }

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOneBy({ id: id });
    return this.courseRepository.remove(course);
  }
}
