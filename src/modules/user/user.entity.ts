import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';

import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import bcrypt from 'bcrypt';

@Entity()
export class UserEntity extends BaseEntity {
  @ApiProperty({
    description: 'db 생성 id',
    type: 'number',
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    description: '회원 이름',
    type: 'string',
    example: '대조영',
  })
  @Column()
  @IsString()
  username: string;

  @ApiProperty({
    description: '비밀번호',
    type: 'string',
  })
  @Column()
  @IsString()
  password: string;
  @ApiProperty({
    description: '이메일',
    type: 'string',
    example: 'todoIsMatter@todo.com',
  })
  @Column()
  @IsEmail()
  email: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new Error('비밀번호 암호화에 실패했습니다.');
      }
    }
  }
}
