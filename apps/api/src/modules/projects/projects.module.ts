import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/project.service';
import { ProjectEntity } from './entities/project.entity';
import { ProjectStatusEntity } from './entities/projectStatus.entity';
import { ProjectStatusColorEntity } from './entities/projectStatusColor.entity';
import { ProjectsRepository } from './repositories/projects.repository';
import { ProjectTagEntity } from './entities/projectTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      ProjectStatusEntity,
      ProjectStatusColorEntity,
      ProjectTagEntity,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}
