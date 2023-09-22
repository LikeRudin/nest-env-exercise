import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UserService } from './user.service';
import { LoginUserDTO } from '../dtos/login-user-dto';
import { Response } from 'express';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  @ApiOperation({ summary: '회원가입' })
  async createUser(
    @Body() createUserData: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.userService.createEmailAccount(createUserData);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  async login(
    @Body() loginUserData: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.userLogin(loginUserData);
    res.cookie('token', token);
    return { message: '로그인 성공' };
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보를 불러옵니다.' })
  async getUserInfo(@Param(':id') userId: number) {
    const userData = await this.userService.getUserInfo(userId);
    return userData;
  }
}
