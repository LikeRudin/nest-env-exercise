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
  async createUser(
    @Body() createUserData: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.userService.createEmailAccount(createUserData);
  }

  @Post('login')
  async login(
    @Body() loginUserData: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.userLogin(loginUserData);
    res.cookie('token', token);
    return { message: '로그인 성공' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user info by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  async getUserInfo(@Param(':id') userId) {
    const userData = await this.userService.getUserInfo(userId);
    return userData;
  }
}
