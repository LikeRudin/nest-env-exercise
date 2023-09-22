import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UserService } from './user.service';
import { LoginUserDTO } from '../dtos/login-user-dto';
import { Response } from 'express';
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
    return res.cookie('token', token);
  }
}
