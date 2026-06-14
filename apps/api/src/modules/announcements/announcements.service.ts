import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { translate } from '../../common/dto/translated-text.dto';
import {
  CreateAnnouncementBody,
  UpdateAnnouncementBody,
} from './dto/announcement.dto';
import { AnnouncementEntity } from './entities/announcement.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private readonly repository: Repository<AnnouncementEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async getActive(language: string) {
    const announcement = await this.repository.findOne({
      where: { published: true },
      order: { updatedAt: 'DESC' },
    });
    if (!announcement) return null;
    return {
      uuid: announcement.uuid,
      title: translate(announcement.title, language),
      content: translate(announcement.content, language),
      actionLabel: announcement.actionLabel
        ? translate(announcement.actionLabel, language)
        : undefined,
      actionUrl: announcement.actionUrl ?? undefined,
      variant: announcement.variant,
      dismissible: announcement.dismissible,
    };
  }

  findAll() {
    return this.repository.find({ order: { updatedAt: 'DESC' } });
  }

  async findOne(uuid: string) {
    const entity = await this.repository.findOne({ where: { uuid } });
    if (!entity) throw new NotFoundException('Announcement not found');
    return entity;
  }

  create(body: CreateAnnouncementBody) {
    this.validateAction(body.actionLabel, body.actionUrl);
    return this.repository.save(
      this.repository.create({
        ...body,
        actionLabel: body.actionLabel ?? null,
        actionUrl: body.actionUrl ?? null,
      }),
    );
  }

  async update(uuid: string, body: UpdateAnnouncementBody) {
    const entity = await this.findOne(uuid);
    const nextLabel = body.actionLabel ?? entity.actionLabel ?? undefined;
    const nextUrl = body.actionUrl ?? entity.actionUrl ?? undefined;
    this.validateAction(nextLabel, nextUrl);
    Object.assign(entity, body);
    entity.actionLabel = nextLabel ?? null;
    entity.actionUrl = nextUrl ?? null;
    return this.repository.save(entity);
  }

  async publish(uuid: string) {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(
        AnnouncementEntity,
        { published: true },
        {
          published: false,
        },
      );
      const entity = await manager.findOne(AnnouncementEntity, {
        where: { uuid },
      });
      if (!entity) throw new NotFoundException('Announcement not found');
      entity.published = true;
      return manager.save(entity);
    });
  }

  async unpublish(uuid: string) {
    const entity = await this.findOne(uuid);
    entity.published = false;
    return this.repository.save(entity);
  }

  async remove(uuid: string) {
    const entity = await this.findOne(uuid);
    if (entity.published) {
      throw new BadRequestException('Published announcement cannot be deleted');
    }
    await this.repository.remove(entity);
  }

  private validateAction(label?: object, url?: string) {
    if (Boolean(label) !== Boolean(url)) {
      throw new BadRequestException(
        'Action label and action URL must be provided together',
      );
    }
    if (url?.startsWith('javascript:')) {
      throw new BadRequestException('Unsupported action URL');
    }
  }
}
