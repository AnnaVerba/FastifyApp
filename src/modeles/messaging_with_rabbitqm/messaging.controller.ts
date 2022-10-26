import { Controller, Get } from '@nestjs/common';

import { MessagingService } from './messaging.service';

@Controller('hardTest')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get()
  async testPerformance() {
    try {
      await this.messagingService.hardTest();
      return 'done';
    } catch (err) {
      return err;
    }
  }
}
