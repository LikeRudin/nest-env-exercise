import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user-dto";
import { UserService} from "./user.service";
import { LoginUserDTO } from "../dtos/login-user-dto";
@Controller('users')
export class UserController {
    
    constructor(private readonly userService: UserService){}
    
    @Post('join')
    async createUser(@Body() createUserData: CreateUserDto, @Req() req: Request): Promise<void>{
        await this.userService.createEmailAccount(createUserData, req);
    }

    @Post('login')
    async login(@Body() loginUserData: LoginUserDTO, @Req() req: Request): Promise<void>{
        await this.userService.userLogin(loginUserData, req);
    }
}