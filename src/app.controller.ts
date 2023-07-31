import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // HTTP GET method for performing a health check on the application.
  // Endpoint: /healthcheck
  // Returns:
  //   - Simple 200 status that can be used for monitoring systems (without authentication)
  @Public()
  @Get('healthcheck')
  healthCheck(): object {
    return this.appService.healthCheck();
  }
}
