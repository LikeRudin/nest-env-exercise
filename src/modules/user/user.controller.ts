import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user-dto";
import { UserSercive } from "./user.service";
import { LoginUserDTO } from "../dtos/login-user-dto";
@Controller('users')
export class UserController {
    
    constructor(private readonly userService: UserSercive){}
    
    @Post()
    async createUser(@Body() createUserData: CreateUserDto, @Req() req: Request): Promise<void>{
        await this.userService.createEmailAccount(createUserData, req);
    }

    @Get()
    async login(@Body() loginUserData: LoginUserDTO, @Req() req: Request): Promise<void>{
        await this.userService.userLogin(loginUserData, req);
    }
}