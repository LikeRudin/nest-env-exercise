import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user-dto';
import { Repository } from 'typeorm';
import { LoginUserDTO } from '../dtos/login-user-dto';
import { UserEntity } from './user.entity';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private createJWT(id: number) {
    const token = JWT.sign({ id }, process.env.COOKIE_SECRET, {
      algorithm: 'HS256',
      expiresIn: 60 * 60,
    });
    return token;
  }

  async createEmailAccount(userdata: CreateUserDto) {
    const { username, email, password } = userdata;
    const userAlreadyExist = await this.userRepository.findOneBy({ email });
    if (userAlreadyExist) {
      throw new UnprocessableEntityException(
        '이미 가입되어있는 이메일 입니다.',
      );
    }
    const user = this.userRepository.create({
      username,
      email,
      password,
    });

    const userCreated = await this.userRepository.save(user);

    if (!userCreated) {
      throw new HttpException(
        '알 수 없는이유로 회원가입에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async userLogin(loginData: LoginUserDTO) {
    const { email, password } = loginData;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자 이메일 입니다.');
    } else if (password !== user.password) {
      throw new HttpException(
        '잘못된 비밀번호 입니다.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return this.createJWT(user.id);
  }

  async getUserInfo(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return user;
  }
}
