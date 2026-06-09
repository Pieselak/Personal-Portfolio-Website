import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { In, Repository } from 'typeorm';
import { CreateProjectBody } from '../dto/input/createProject.dto';
import { UpdateProjectBody } from '../dto/input/updateProject.dto';
import {
  GetProjectResponse,
  ProjectDeveloperResponse,
} from '../dto/response/getProject.dto';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectStatusEntity } from '../entities/projectStatus.entity';
import { ProjectTagEntity } from '../entities/projectTag.entity';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(ProjectStatusEntity)
    private readonly statusRepo: Repository<ProjectStatusEntity>,
    @InjectRepository(ProjectTagEntity)
    private readonly tagRepo: Repository<ProjectTagEntity>,
  ) {}

  private parseJsonArray<T>(value: unknown): T[] {
    if (!value) return [];
    if (Array.isArray(value)) return value as T[];
    if (typeof value === 'string') {
      try {
        const parsed: unknown = JSON.parse(value);
        return Array.isArray(parsed) ? (parsed as T[]) : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  private formatDate(date?: Date | string | null): string | undefined {
    if (!date) return undefined;
    return new Date(date).toISOString().split('T')[0];
  }

  private formatProjectResponse(project: ProjectEntity): GetProjectResponse {
    const jsonTags = this.parseJsonArray<{ name?: string; icon?: string }>(
      project.tags,
    );
    const tags: string[] =
      project.projectTags?.length > 0
        ? project.projectTags.map((tag) => tag.label)
        : jsonTags.map((tag) => tag.name ?? '');
    const developers = this.parseJsonArray<ProjectDeveloperResponse>(
      project.developers,
    );

    return {
      uuid: project.uuid,
      status: {
        code: project.status.code,
        label: project.status.label,
      },
      title: project.title,
      shortDescription: project.shortDescription,
      detailedDescription: project.detailedDescription,
      imageUrl: project.image ?? undefined,
      tags,
      sourceCodeOpen: project.sourceCodeOpen,
      sourceCodeUrl: project.sourceCodeUrl ?? undefined,
      developers,
      startDate: this.formatDate(project.startDate),
      completeDate: this.formatDate(project.completeDate),
    };
  }

  private async findStatusByCode(
    statusCode: string,
  ): Promise<ProjectStatusEntity | null> {
    return this.statusRepo.findOne({ where: { code: statusCode } });
  }

  async upsertStatus(
    code: string,
    label: string,
  ): Promise<ProjectStatusEntity> {
    const existingStatus = await this.statusRepo.findOne({ where: { code } });

    if (existingStatus) {
      existingStatus.label = label;
      return this.statusRepo.save(existingStatus);
    }

    return this.statusRepo.save(
      this.statusRepo.create({
        code,
        label,
      }),
    );
  }

  private async resolveTags(labels?: string[]): Promise<ProjectTagEntity[]> {
    if (!labels?.length) return [];

    const uniqueLabels = [...new Set(labels.map((label) => label.trim()))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    if (!uniqueLabels.length) return [];

    const existingTags = await this.tagRepo.find({
      where: { label: In(uniqueLabels) },
    });
    const existingLabels = new Set(existingTags.map((tag) => tag.label));
    const missingTags = uniqueLabels
      .filter((label) => !existingLabels.has(label))
      .map((label) => this.tagRepo.create({ label }));

    return [...existingTags, ...missingTags];
  }

  private applyProjectData(
    project: ProjectEntity,
    body: CreateProjectBody | UpdateProjectBody,
  ): void {
    if (body.title !== undefined) project.title = body.title;
    if (body.shortDescription !== undefined) {
      project.shortDescription = body.shortDescription;
    }
    if (body.detailedDescription !== undefined) {
      project.detailedDescription = body.detailedDescription;
    }
    if (body.imageUrl !== undefined) project.image = body.imageUrl ?? null;
    if (body.sourceCodeOpen !== undefined) {
      project.sourceCodeOpen = body.sourceCodeOpen;
    }
    if (body.sourceCodeUrl !== undefined) {
      project.sourceCodeUrl = body.sourceCodeUrl ?? null;
    }
    if (body.developers !== undefined) project.developers = body.developers;
    if (body.tags !== undefined) {
      project.tags = body.tags.map((tag) => ({ name: tag }));
    }
    if (body.startDate !== undefined) {
      project.startDate = body.startDate ? new Date(body.startDate) : null;
    }
    if (body.completeDate !== undefined) {
      project.completeDate = body.completeDate
        ? new Date(body.completeDate)
        : null;
    }
  }

  async checkIfProjectExistsByUuid(uuid: string): Promise<boolean> {
    return this.projectRepo.exists({ where: { uuid } });
  }

  async findAllProjects(): Promise<GetProjectResponse[]> {
    const result = await this.projectRepo.find();

    return result.map((project) => this.formatProjectResponse(project));
  }

  async findProjectByUuid(uuid: string): Promise<GetProjectResponse | null> {
    const result = await this.projectRepo.findOne({
      where: { uuid },
    });

    if (!result) return null;

    return this.formatProjectResponse(result);
  }

  async createProject(
    body: CreateProjectBody,
  ): Promise<GetProjectResponse | null> {
    const status = await this.findStatusByCode(body.status);
    if (!status) return null;

    const project = this.projectRepo.create({
      uuid: randomUUID(),
      status,
      title: body.title,
      shortDescription: body.shortDescription,
      detailedDescription: body.detailedDescription,
      image: body.imageUrl ?? null,
      sourceCodeOpen: body.sourceCodeOpen,
      sourceCodeUrl: body.sourceCodeUrl ?? null,
      developers: body.developers ?? [],
      tags: body.tags?.map((tag) => ({ name: tag })) ?? [],
      startDate: body.startDate ? new Date(body.startDate) : null,
      completeDate: body.completeDate ? new Date(body.completeDate) : null,
      projectTags: await this.resolveTags(body.tags),
    });

    return this.formatProjectResponse(await this.projectRepo.save(project));
  }

  async updateProject(
    uuid: string,
    body: UpdateProjectBody,
  ): Promise<GetProjectResponse | null> {
    const project = await this.projectRepo.findOne({ where: { uuid } });
    if (!project) return null;

    if (body.status !== undefined) {
      const status = await this.findStatusByCode(body.status);
      if (!status) return null;
      project.status = status;
    }

    this.applyProjectData(project, body);

    if (body.tags !== undefined) {
      project.projectTags = await this.resolveTags(body.tags);
    }

    return this.formatProjectResponse(await this.projectRepo.save(project));
  }

  async deleteProject(uuid: string): Promise<boolean> {
    const result = await this.projectRepo.delete({ uuid });
    return (result.affected ?? 0) > 0;
  }
}
