import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP, CONFIG } from '@/constants';
import { dbConfig } from '@/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserController } from './modules/user/user.controller';
import { UserService} from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env.' + (process.env.NODE_ENV || APP.NODE_ENV.DEVELOPMENT),
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(CONFIG.DB),
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
