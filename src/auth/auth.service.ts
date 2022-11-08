import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SigninDto } from "./dto/signin.dto";
import { hash, compare } from "bcrypt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "./user/entities/user.entity";
import { UserService } from "./user.service";

interface UserInfo {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  user: UserInfo;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signin(signinDto: SigninDto): Promise<AuthUser> {
    const { password, email } = signinDto;
    const existUser = await this.userService.findByEmail(email);
    if (existUser)
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);

    const hashedPassword = await hash(password, 10);
    const newUser = this.userRepository.create({
      ...signinDto,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return this.getDataObj(newUser);
  }

  async login(loginAuthDto: LoginDto): Promise<AuthUser> {
    const { email, password } = loginAuthDto;
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new HttpException("Wrong credentials", HttpStatus.FORBIDDEN);

    if (!this.isSamePassword(user, password)) {
      throw new HttpException("Wrong credentials", HttpStatus.FORBIDDEN);
    } else {
      return this.getDataObj(user);
    }
  }

  async checkIfEmailExists(email) {
    const existUser = await this.userService.findByEmail(email);
    return existUser ? true : false;
  }

  async isSamePassword(user: User, inputPassword: string): Promise<boolean> {
    return await compare(inputPassword, user.password);
  }

  getDataObj(user: User): AuthUser {
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const data = {
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token: token,
    };

    return data;
  }
}
