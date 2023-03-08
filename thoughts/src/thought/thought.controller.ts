import { Controller } from '@nestjs/common';
import { ThoughtService } from './thought.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('thought')
export class ThoughtController {
  constructor(private readonly thoghtService: ThoughtService) {}

  @MessagePattern('get_all_thoughts')
  async get() {
    return this.thoghtService.all();
  }
}
