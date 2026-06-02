import { Controller, Get } from '@nestjs/common';
import { GlucoseService } from '../services/glucose.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentGlucoseResponse } from '../dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from '../dto/response/getGraphData.dto';
import { GetSensorDataResponse } from '../dto/response/getSensorData.dto';
import { CheckMaintenance } from '../../status/decorators/checkMaintenance.decorator';

@Controller('glucose')
@ApiTags('Glucose Data')
export class GlucoseController {
  constructor(private readonly glucoseService: GlucoseService) {}

  @CheckMaintenance()
  @Get('current')
  @ApiOperation({
    summary: 'Get current glucose data',
    description: 'Retrieves the current glucose reading.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved glucose data',
    type: GetCurrentGlucoseResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    return await this.glucoseService.getCurrentGlucose();
  }

  @CheckMaintenance()
  @Get('graph')
  @ApiOperation({
    summary: 'Get glucose graph data',
    description: 'Retrieves glucose data formatted for graphing purposes.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved graph data',
    type: GetGraphDataResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getGraphData(): Promise<GetGraphDataResponse> {
    return await this.glucoseService.getGraphData();
  }

  @CheckMaintenance()
  @Get('sensor')
  @ApiOperation({
    summary: 'Get sensor data',
    description: 'Retrieves data about the glucose sensor.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved sensor data',
    type: GetSensorDataResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getSensorData(): Promise<GetSensorDataResponse> {
    return await this.glucoseService.getSensorData();
  }
}
