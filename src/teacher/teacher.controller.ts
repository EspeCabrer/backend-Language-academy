import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teacher } from "./entities/teacher.entity";

@ApiBearerAuth()
@ApiTags("teacher")
@UseGuards(JwtAuthGuard)
@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeacherDto: UpdateTeacherDto
  ): Promise<Teacher> {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Teacher> {
    return this.teacherService.remove(+id);
  }
}
