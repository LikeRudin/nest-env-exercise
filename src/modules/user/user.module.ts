import { Module, Logger } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/modules/user/user.controller';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, Logger],
  exports: [TypeOrmModule],
})
export class UserModule {}
