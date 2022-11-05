import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const hashedPassword = await hash(password,10);
    const newUser = this.userRepository.create({...registerAuthDto, password: hashedPassword});
    return this.userRepository.save(newUser);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new HttpException('Wrong credentials',HttpStatus.FORBIDDEN);
    
    if (!this.isSamePassword(user, password)) {
      throw new HttpException('Wrong credentials', HttpStatus.FORBIDDEN);
    } else {

      const payload = { id: user.id,email: user.email }
      const token = this.jwtService.sign(payload)

      const data = {
        user: {
          id: user.id,
          email,
          createdAt: user.createdAt,
          updtedAt: user.createdAt
        },
        token: token
      }

      return data;
    }
  }

  async isSamePassword(user: User, inputPassword: string): Promise<boolean> {
    return await compare(inputPassword, user.password);
  }



  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
