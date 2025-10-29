import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from '../../dtos/dashboard/dashboard-response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guards';
import { CurrentUserId } from '../../common/decorators/current-user-id.decorator';  // adjust path

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@CurrentUserId() userId: string): Promise<DashboardResponseDto> {
    return this.dashboardService.getUserDashboard(userId);
  }
}
