import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UserService } from './user.service';
import { LoginUserDTO } from '../dtos/login-user-dto';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post('join')
  @ApiOperation({ summary: '회원가입' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('Post /users/join', JSON.stringify(createUserDto));
    return await this.userService.createEmailAccount(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  async login(
    @Body() loginUserDTO: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('Post /users/login', JSON.stringify(loginUserDTO));
    const token = await this.userService.userLogin(loginUserDTO);
    res.cookie('token', token);
    return { message: '로그인 성공' };
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보를 불러옵니다.' })
  async getUserInfo(@Param('id') userId: number) {
    this.logger.log('Get /users/:id', userId);
    const userData = await this.userService.getUserInfo(userId);
    return userData;
  }
}
