import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthPermissions } from '../auth/decorators/auth-permissions.decorator';
import { AnnouncementsService } from './announcements.service';
import {
  AnnouncementResponse,
  CreateAnnouncementBody,
  UpdateAnnouncementBody,
} from './dto/announcement.dto';

@Controller('announcements')
@ApiTags('Announcements')
export class AnnouncementsController {
  constructor(private readonly service: AnnouncementsService) {}

  @Get('active')
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['pl', 'en', 'de'],
  })
  @ApiOkResponse({ type: AnnouncementResponse })
  getActive(@Query('lang') language = 'pl') {
    return this.service.getActive(language);
  }

  @Get()
  @AuthPermissions('announcements:read')
  findAll() {
    return this.service.findAll();
  }

  @Get(':uuid')
  @AuthPermissions('announcements:read')
  findOne(@Param('uuid') uuid: string) {
    return this.service.findOne(uuid);
  }

  @Post()
  @AuthPermissions('announcements:create')
  create(@Body() body: CreateAnnouncementBody) {
    return this.service.create(body);
  }

  @Patch(':uuid')
  @AuthPermissions('announcements:update')
  update(@Param('uuid') uuid: string, @Body() body: UpdateAnnouncementBody) {
    return this.service.update(uuid, body);
  }

  @Post(':uuid/publish')
  @AuthPermissions('announcements:publish')
  publish(@Param('uuid') uuid: string) {
    return this.service.publish(uuid);
  }

  @Post(':uuid/unpublish')
  @AuthPermissions('announcements:publish')
  unpublish(@Param('uuid') uuid: string) {
    return this.service.unpublish(uuid);
  }

  @Delete(':uuid')
  @AuthPermissions('announcements:delete')
  async remove(@Param('uuid') uuid: string) {
    await this.service.remove(uuid);
    return { deleted: true };
  }
}
