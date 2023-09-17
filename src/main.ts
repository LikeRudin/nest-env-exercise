import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

class Application {
  private logger = new Logger(Application.name);
  private PORT: string;

  constructor(private app: INestApplication){
    this.app = app;
    this.PORT = process.env.PORT;
  }

  async bootstrap(){
    await this.app.listen(this.PORT);
  }

  startLog(){
    this.logger.log(
      `Server is running at http://localhost:${this.PORT}`
    );
  }

}

const init = async () =>{
  const server = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init();