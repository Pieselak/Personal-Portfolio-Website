import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthPermissions } from '../auth/decorators/auth-permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import {
  CreateBossBody,
  CreateQuestionBody,
  GameAdminStatsResponse,
  ImportGameContentBody,
  ImportGameContentResponse,
  PublicBossResponse,
  UpdateBossBody,
  UpdateQuestionBody,
} from './dto/game.dto';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Controller('game')
@ApiTags('Game')
export class GameController {
  constructor(
    private readonly service: GameService,
    private readonly gateway: GameGateway,
  ) {}

  @Get('bosses')
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['pl', 'en', 'de'],
  })
  @ApiOkResponse({ type: [PublicBossResponse] })
  getBosses(@Query('lang') language = 'pl') {
    return this.service.getPublicBosses(language);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  getHistory(@CurrentUser() user: AuthenticatedUser) {
    return this.service.getUserHistory(user.uuid);
  }

  @Get('admin/bosses')
  @AuthPermissions('game.content:read')
  getAdminBosses() {
    return this.service.getAdminBosses();
  }

  @Get('admin/stats')
  @AuthPermissions('game.settings:read')
  @ApiOkResponse({ type: GameAdminStatsResponse })
  getAdminStats(): GameAdminStatsResponse {
    return { activePlayers: this.gateway.getActivePlayerCount() };
  }

  @Post('admin/bosses')
  @AuthPermissions('game.content:create')
  createBoss(@Body() body: CreateBossBody) {
    return this.service.createBoss(body);
  }

  @Post('admin/import')
  @AuthPermissions('game.content:create')
  @ApiOkResponse({ type: ImportGameContentResponse })
  importGameContent(
    @Body() body: ImportGameContentBody,
  ): Promise<ImportGameContentResponse> {
    return this.service.importGameContent(body);
  }

  @Patch('admin/bosses/:uuid')
  @AuthPermissions('game.content:update')
  updateBoss(@Param('uuid') uuid: string, @Body() body: UpdateBossBody) {
    return this.service.updateBoss(uuid, body);
  }

  @Delete('admin/bosses/:uuid')
  @AuthPermissions('game.content:delete')
  async deleteBoss(@Param('uuid') uuid: string) {
    await this.service.deleteBoss(uuid);
    return { deleted: true };
  }

  @Get('admin/questions')
  @AuthPermissions('game.content:read')
  getAdminQuestions() {
    return this.service.getAdminQuestions();
  }

  @Post('admin/questions')
  @AuthPermissions('game.content:create')
  createQuestion(@Body() body: CreateQuestionBody) {
    return this.service.createQuestion(body);
  }

  @Patch('admin/questions/:uuid')
  @AuthPermissions('game.content:update')
  updateQuestion(
    @Param('uuid') uuid: string,
    @Body() body: UpdateQuestionBody,
  ) {
    return this.service.updateQuestion(uuid, body);
  }

  @Delete('admin/questions/:uuid')
  @AuthPermissions('game.content:delete')
  async deleteQuestion(@Param('uuid') uuid: string) {
    await this.service.deleteQuestion(uuid);
    return { deleted: true };
  }
}
