import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { In, Repository } from 'typeorm';
import {
  translate,
  TranslatedText,
} from '../../../common/dto/translated-text.dto';
import { CreateProjectBody } from '../dto/input/createProject.dto';
import { UpdateProjectBody } from '../dto/input/updateProject.dto';
import {
  AdminProjectResponse,
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

  private fallback(value: string): TranslatedText {
    return { pl: value, en: value, de: value };
  }

  private getTranslations(project: ProjectEntity) {
    return {
      title: project.titleI18n ?? this.fallback(project.title),
      shortDescription:
        project.shortDescriptionI18n ?? this.fallback(project.shortDescription),
      detailedDescription:
        project.detailedDescriptionI18n ??
        this.fallback(project.detailedDescription),
    };
  }

  private formatProjectResponse(
    project: ProjectEntity,
    language = 'pl',
  ): GetProjectResponse {
    const jsonTags = this.parseJsonArray<{ name?: string }>(project.tags);
    const tags =
      project.projectTags?.length > 0
        ? project.projectTags.map((tag) => tag.label)
        : jsonTags.map((tag) => tag.name ?? '');
    const translations = this.getTranslations(project);

    return {
      uuid: project.uuid,
      status: {
        code: project.status.code,
        label: project.status.label,
      },
      title: translate(translations.title, language),
      shortDescription: translate(translations.shortDescription, language),
      detailedDescription: translate(
        translations.detailedDescription,
        language,
      ),
      imageUrl: project.image ?? undefined,
      tags,
      sourceCodeOpen: project.sourceCodeOpen,
      sourceCodeUrl: project.sourceCodeUrl ?? undefined,
      developers: this.parseJsonArray<ProjectDeveloperResponse>(
        project.developers,
      ),
      startDate: this.formatDate(project.startDate),
      completeDate: this.formatDate(project.completeDate),
    };
  }

  private formatAdminResponse(project: ProjectEntity): AdminProjectResponse {
    return {
      ...this.formatProjectResponse(project),
      translations: this.getTranslations(project),
      isPublished: project.isPublished,
    };
  }

  private findStatusByCode(code: string) {
    return this.statusRepo.findOne({ where: { code } });
  }

  async upsertStatus(code: string, label: string) {
    const existing = await this.findStatusByCode(code);
    if (existing) {
      existing.label = label;
      return this.statusRepo.save(existing);
    }
    return this.statusRepo.save(this.statusRepo.create({ code, label }));
  }

  async migrateLegacyProjects(): Promise<void> {
    const projects = await this.projectRepo.find();
    const legacy = projects.filter((project) => !project.titleI18n);
    await Promise.all(
      legacy.map((project) => {
        project.titleI18n = this.fallback(project.title);
        project.shortDescriptionI18n = this.fallback(project.shortDescription);
        project.detailedDescriptionI18n = this.fallback(
          project.detailedDescription,
        );
        project.isPublished = true;
        return this.projectRepo.save(project);
      }),
    );
  }

  private async resolveTags(labels?: string[]) {
    if (!labels?.length) return [];
    const unique = [...new Set(labels.map((label) => label.trim()))].filter(
      Boolean,
    );
    const existing = await this.tagRepo.find({
      where: { label: In(unique) },
    });
    const existingLabels = new Set(existing.map((tag) => tag.label));
    const missing = unique
      .filter((label) => !existingLabels.has(label))
      .map((label) => this.tagRepo.create({ label }));
    return [...existing, ...missing];
  }

  private applyProjectData(
    project: ProjectEntity,
    body: CreateProjectBody | UpdateProjectBody,
  ) {
    if (body.title) {
      project.titleI18n = body.title;
      project.title = body.title.pl;
    }
    if (body.shortDescription) {
      project.shortDescriptionI18n = body.shortDescription;
      project.shortDescription = body.shortDescription.pl;
    }
    if (body.detailedDescription) {
      project.detailedDescriptionI18n = body.detailedDescription;
      project.detailedDescription = body.detailedDescription.pl;
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
    if (body.isPublished !== undefined) {
      project.isPublished = body.isPublished;
    }
  }

  async findAllProjects(language = 'pl') {
    const projects = await this.projectRepo.find({
      where: { isPublished: true },
    });
    return projects.map((project) =>
      this.formatProjectResponse(project, language),
    );
  }

  async findProjectByUuid(uuid: string, language = 'pl') {
    const project = await this.projectRepo.findOne({
      where: { uuid, isPublished: true },
    });
    return project ? this.formatProjectResponse(project, language) : null;
  }

  async findAllAdminProjects() {
    const projects = await this.projectRepo.find();
    return projects.map((project) => this.formatAdminResponse(project));
  }

  async findAdminProjectByUuid(uuid: string) {
    const project = await this.projectRepo.findOne({ where: { uuid } });
    return project ? this.formatAdminResponse(project) : null;
  }

  async createProject(body: CreateProjectBody) {
    const status = await this.findStatusByCode(body.status);
    if (!status) return null;
    const project = this.projectRepo.create({
      uuid: randomUUID(),
      status,
      title: body.title.pl,
      titleI18n: body.title,
      shortDescription: body.shortDescription.pl,
      shortDescriptionI18n: body.shortDescription,
      detailedDescription: body.detailedDescription.pl,
      detailedDescriptionI18n: body.detailedDescription,
      image: body.imageUrl ?? null,
      sourceCodeOpen: body.sourceCodeOpen,
      sourceCodeUrl: body.sourceCodeUrl ?? null,
      developers: body.developers ?? [],
      tags: body.tags?.map((tag) => ({ name: tag })) ?? [],
      startDate: body.startDate ? new Date(body.startDate) : null,
      completeDate: body.completeDate ? new Date(body.completeDate) : null,
      isPublished: body.isPublished ?? false,
      projectTags: await this.resolveTags(body.tags),
    });
    return this.formatAdminResponse(await this.projectRepo.save(project));
  }

  async updateProject(uuid: string, body: UpdateProjectBody) {
    const project = await this.projectRepo.findOne({ where: { uuid } });
    if (!project) return null;
    if (body.status) {
      const status = await this.findStatusByCode(body.status);
      if (!status) return null;
      project.status = status;
    }
    this.applyProjectData(project, body);
    if (body.tags) project.projectTags = await this.resolveTags(body.tags);
    return this.formatAdminResponse(await this.projectRepo.save(project));
  }

  async setPublished(uuid: string, isPublished: boolean) {
    const project = await this.projectRepo.findOne({ where: { uuid } });
    if (!project) return null;
    project.isPublished = isPublished;
    return this.formatAdminResponse(await this.projectRepo.save(project));
  }

  async deleteProject(uuid: string) {
    const result = await this.projectRepo.delete({ uuid });
    return (result.affected ?? 0) > 0;
  }
}
