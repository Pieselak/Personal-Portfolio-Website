import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectResponse {
  @ApiProperty({ example: true })
  deleted: boolean;
}
