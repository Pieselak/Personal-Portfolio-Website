import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfig } from '../../../config';
import { UsersService } from '../../users/services/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { TokenBlacklistService } from '../services/token-blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly blacklistService: TokenBlacklistService,
    authConfig: AuthConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    if (await this.blacklistService.isBlacklisted(payload.jti)) {
      throw new UnauthorizedException('Token has been revoked');
    }

    const user = await this.usersService.findUserByUuid(payload.sub);

    if (!this.usersService.isUserAccessAllowed(user)) {
      throw new UnauthorizedException('User is inactive or blocked');
    }

    return {
      uuid: user.uuid,
      email: user.email,
      username: user.username,
      role: user.role.code,
      permissions:
        user.role.permissions?.map((permission) => permission.code) ?? [],
      tokenId: payload.jti,
      tokenExpiresAt: payload.exp,
    };
  }
}
