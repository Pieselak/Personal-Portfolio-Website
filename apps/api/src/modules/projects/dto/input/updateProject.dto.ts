import { PartialType } from '@nestjs/swagger';
import { CreateProjectBody } from './createProject.dto';

export class UpdateProjectBody extends PartialType(CreateProjectBody) {}
