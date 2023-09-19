import { Module } from '@nestjs/common';
import { UserSercive } from '@/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/user.entity';
import { UserController } from '@/modules/user/user.controller';
interface Request {
  session: any
}

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserSercive],
  exports:[TypeOrmModule],
  
})
export class UsersModule {}