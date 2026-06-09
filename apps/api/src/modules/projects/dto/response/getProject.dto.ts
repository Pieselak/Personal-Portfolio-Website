import { ApiProperty } from '@nestjs/swagger';

export class ProjectStatusResponse {
  @ApiProperty({ example: 'IN_PROGRESS' })
  code: string;

  @ApiProperty({ example: 'In progress' })
  label: string;
}

export class ProjectDeveloperResponse {
  @ApiProperty({ example: 'Patryk Z.' })
  name: string;

  @ApiProperty({ required: false, example: 'Full-Stack Developer' })
  role?: string;

  @ApiProperty({ required: false, example: 'https://github.com/Pieselak' })
  profileUrl?: string;
}

export class GetProjectResponse {
  @ApiProperty({
    description: 'Unique identifier for the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({ type: ProjectStatusResponse })
  status: ProjectStatusResponse;

  @ApiProperty({ example: 'Portfolio Website with Glucose Sensor Integration' })
  title: string;

  @ApiProperty({ example: 'Modern portfolio website with CGM integration.' })
  shortDescription: string;

  @ApiProperty({
    example:
      'The project presents a portfolio, projects module, and glucose sensor integration.',
  })
  detailedDescription: string;

  @ApiProperty({
    required: false,
    example: 'https://example.com/project-preview.png',
  })
  imageUrl?: string;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['TypeScript', 'React', 'NestJS'],
  })
  tags: string[];

  @ApiProperty({ example: true })
  sourceCodeOpen: boolean;

  @ApiProperty({
    required: false,
    example: 'https://github.com/Pieselak/Vite_React_ExpressJS_AboutMe',
  })
  sourceCodeUrl?: string;

  @ApiProperty({ type: ProjectDeveloperResponse, isArray: true })
  developers: ProjectDeveloperResponse[];

  @ApiProperty({ required: false, example: '2025-11-19' })
  startDate?: string;

  @ApiProperty({ required: false, example: '2026-01-31' })
  completeDate?: string;
}
