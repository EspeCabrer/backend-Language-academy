import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Teacher } from './teacher/entities/teacher.entity';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { Student } from 'src/student/entities/student.entity';
import { Course } from './course/entities/course.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

const dbConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [Teacher, Course, Student, User],
  synchronize: true
}
    
@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TeacherModule,
    StudentModule,
    CourseModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
  
export class AppModule { }
