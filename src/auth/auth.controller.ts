import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // HTTP POST method for user authentication (sign-in).
  // Endpoint: /login
  // Parameters:
  //   - signInDto: SignInDto - An object containing the username and password for authentication.
  // Returns:
  //   - An object with access token, if successfully authenticated; otherwise, UnauthorizedException (Error 401)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
