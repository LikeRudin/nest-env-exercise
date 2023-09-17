import { DocumentBuilder } from '@nestjs/swagger';
import { APP } from '@/constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('ToDoIsMatter-backend API')
  .setDescription('ToDoIsMatter Docs')
  .setVersion(APP.VERSION)
  .build();