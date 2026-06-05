import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '../../../users/dto/response/user.dto';

export class AuthResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ example: 'Bearer' })
  tokenType: string;

  @ApiProperty({ type: UserResponse })
  user: UserResponse;
}

export class LogoutResponse {
  @ApiProperty({ example: true })
  revoked: boolean;
}
