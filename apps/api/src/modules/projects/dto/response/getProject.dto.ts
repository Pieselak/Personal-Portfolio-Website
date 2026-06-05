import { ApiProperty } from '@nestjs/swagger';

export class GetProjectResponse {
  @ApiProperty({
    description: 'Unique identifier for the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;
  status: {
    code: string;
    label: string;
    icon: string;
    color: { code: string; label: string };
  };
  title: string;
  shortDescription: string;
  detailedDescription: string;
  imageUrl?: string;
  tags?: Array<{ name: string; icon: string }>;
  sourceCodeOpen: boolean;
  sourceCodeUrl?: string;
  developers?: Array<{
    name: string;
    role?: string;
    profileUrl?: string;
  }>;
  startDate?: string;
  completeDate?: string;
}
