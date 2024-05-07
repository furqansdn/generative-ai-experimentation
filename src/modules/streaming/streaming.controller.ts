import { Body, Controller, Post } from '@nestjs/common';
import { PostStreamingDTO } from './dto/streaming.dto';
import { StreamingService } from './streaming.service';

@Controller('streaming')
export class StreamingController {
  constructor(private streamingService: StreamingService) {}

  @Post('/')
  chatStreamingPrompt(@Body() { prompt }: PostStreamingDTO) {
    return this.streamingService.streamAbleChat(prompt);
  }
}
