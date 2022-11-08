import { User } from "./user/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";

describe("AuthService", () => {
  let authService: AuthService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            signin: jest.fn(),
            checkIfEmailExists: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it("authService should be defined", () => {
    expect(authService).toBeDefined();
  });
  it("userRepository should be defined", () => {
    expect(userRepository).toBeDefined();
  });

  describe("checkIfEmailExists", () => {
    it("should return false", async () => {
      const result = await authService.checkIfEmailExists("test@email.com");
      expect(result).toBe(false);
    });
  });
});
