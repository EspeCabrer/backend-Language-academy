import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Validator } from "class-validator";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SigninDto } from "./dto/signin.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  registerUser(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post("login")
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
