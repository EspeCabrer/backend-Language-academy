import { PartialType } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";

export class SigninDto extends PartialType(LoginDto) {}
