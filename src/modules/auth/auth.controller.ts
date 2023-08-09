import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { TokenDto } from './dto/token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'sign in' })
  @ApiResponse({ description: 'Get token', type: TokenDto })
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.login, body.password);
  }

  @Post('signup')
  @ApiOperation({ summary: 'sign up' })
  @ApiResponse({ description: 'Get token', type: TokenDto })
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
