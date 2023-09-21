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
    @Req() req: Request,
  ): Promise<void> {
    await this.userService.createEmailAccount(createUserData);
  }

  @Post('login')
  async login(
    @Body() loginUserData: LoginUserDTO,
    @Res() res: Response,
  ): Promise<Record<string, any>> {
    const token = await this.userService.userLogin(loginUserData);
    res.cookie('token', token);
    return res.status(200).send('logged in');
  }
}
