import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  streamAbleChat(prompt: string) {
    console.log(process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME);
    console.log(prompt);
    return process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME;
  }
}
