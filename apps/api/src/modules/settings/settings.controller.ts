import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthPermissions } from '../auth/decorators/auth-permissions.decorator';
import { GameSettingsResponse, UpdateGameSettingsBody } from './settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
@ApiTags('Settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get('game/public')
  @ApiOkResponse({ type: GameSettingsResponse })
  getPublicGameSettings(): Promise<GameSettingsResponse> {
    return this.service.getGameSettings();
  }

  @Get('game')
  @AuthPermissions('game.settings:read')
  @ApiOkResponse({ type: GameSettingsResponse })
  getGameSettings(): Promise<GameSettingsResponse> {
    return this.service.getGameSettings();
  }

  @Patch('game')
  @AuthPermissions('game.settings:update')
  @ApiOkResponse({ type: GameSettingsResponse })
  updateGameSettings(
    @Body() body: UpdateGameSettingsBody,
  ): Promise<GameSettingsResponse> {
    return this.service.updateGameSettings(body.enabled);
  }
}
