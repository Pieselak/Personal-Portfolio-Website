import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { LoginBody } from './dto/input/login.dto';
import { RegisterBody } from './dto/input/register.dto';
import { AuthResponse, LogoutResponse } from './dto/response/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { UserResponse } from '../users/dto/response/user.dto';
import { UsersService } from '../users/services/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register user',
    description:
      'Creates a user account. The first registered account receives the ADMIN role; later users receive USER.',
  })
  @ApiCreatedResponse({ type: AuthResponse })
  async register(@Body() body: RegisterBody): Promise<AuthResponse> {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log in',
    description:
      'Authenticates by email or username and returns a JWT access token.',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() body: LoginBody): Promise<AuthResponse> {
    return this.authService.login(body.identifier, body.password);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Log out',
    description:
      'Revokes the current JWT by adding its token id to the Redis blacklist.',
  })
  @ApiOkResponse({ type: LogoutResponse })
  async logout(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<LogoutResponse> {
    await this.authService.logout(user);
    return { revoked: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({ type: UserResponse })
  async me(@CurrentUser() user: AuthenticatedUser): Promise<UserResponse> {
    return UserResponse.fromEntity(
      await this.usersService.findUserByUuid(user.uuid),
    );
  }
}
