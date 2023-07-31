import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): object {
    return {
      status: 'ok',
      message: 'API is healthy',
    };
  }
}
