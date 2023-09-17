import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';

import expressBasicAuth from 'express-basic-auth';

import { AppModule } from '@/app.module';
import { API_URL } from '@/constants';
import { swaggerConfig } from '@/configs/swagger.config';

class Application {
  private logger = new Logger(Application.name);
  private PORT: string;

  constructor(private app: NestExpressApplication){
    this.app = app;
    this.PORT = process.env.PORT;
  }

  private async setUpOpenAPI() {
    this.app.use([
      API_URL.SWAGGER.DOCS,
      API_URL.SWAGGER.DOCS_JSON
      ],
      expressBasicAuth({
        challenge:true,
        users: {
          [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD,
        },
      }),
    );
    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup(
      API_URL.SWAGGER.DOCS,
      this.app,
      document,
      );
  }

  async bootstrap(){
    await this.setUpOpenAPI();
    await this.app.listen(this.PORT);
  }

  startLog(){
    this.logger.log(
      `Server is running at http://localhost:${this.PORT}`
    );
  }

}

const init = async () =>{
  const server = await NestFactory.create<NestExpressApplication>(
    AppModule,{ bufferLogs: true, }
    );
  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init();

