import { HttpException, Injectable } from '@nestjs/common';
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
    const userAlreadyExist = await this.userRepository.findOne({
      where: [{ email }],
    });
    if (userAlreadyExist) {
      throw new HttpException('이미 가입한 이메일 입니다. ', 404);
    }
    const user = this.userRepository.create({
      username,
      email,
      password,
    });

    const userCreated = await this.userRepository.save(user);

    if (!userCreated) {
      throw new HttpException('알 수 없는이유로 회원가입에 실패했습니다.', 502);
    }
  }

  async userLogin(loginData: LoginUserDTO) {
    const { email, password } = loginData;
    const user = await this.userRepository.findOne({ where: [{ email }] });

    if (!user) {
      throw new HttpException('존재하지않는 사용자 이메일입니다', 402);
    } else if (password !== user.password) {
      throw new HttpException('잘못된 비밀번호 입니다.', 402);
    }

    return this.createJWT(user.id);
  }
}
