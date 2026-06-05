import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { UserResponse } from '../../users/dto/response/user.dto';
import { AuthResponse } from '../dto/response/auth.dto';
import { AuthConfig } from '../../../config';
import { TokenBlacklistService } from './token-blacklist.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authConfig: AuthConfig,
    private readonly blacklistService: TokenBlacklistService,
  ) {}

  async register(data: {
    email: string;
    username: string;
    password: string;
  }): Promise<AuthResponse> {
    const user = await this.usersService.createUser(data);
    return this.issueAuthResponse(user);
  }

  async login(identifier: string, password: string): Promise<AuthResponse> {
    const user = identifier.includes('@')
      ? await this.usersService.findUserByEmail(identifier)
      : await this.usersService.findUserByUsername(identifier);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueAuthResponse(user);
  }

  async logout(user: AuthenticatedUser): Promise<void> {
    await this.blacklistService.blacklistToken(
      user.tokenId,
      user.tokenExpiresAt,
    );
  }

  private async issueAuthResponse(user: UserEntity): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.uuid,
      email: user.email,
      username: user.username,
      role: user.role.code,
      permissions:
        user.role.permissions?.map((permission) => permission.code) ?? [],
      jti: randomUUID(),
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.authConfig.jwtExpiresIn,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      user: UserResponse.fromEntity(user),
    };
  }
}
