import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; // Import JwtService for the login test
import { UsersModule } from '../users/users.module'; // Import UsersModule for the login test
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
      imports: [UsersModule],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Should throw unauthorized with wrong username', async () => {
    try {
      await authController.signIn({ username: 'wrongUser', password: 'wrongPass' });
      // If the above line doesn't throw an error, the test should fail
      fail('Expected method to throw an error.');
    } catch (error) {
      // Check if the error is an instance of UnauthorizedException
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
});
