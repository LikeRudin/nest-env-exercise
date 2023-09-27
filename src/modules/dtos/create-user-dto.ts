import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: '이메일',
    example: 'todo@email.com',
  })
  readonly email: string;
  @ApiProperty({
    description: '비밀번호',
    example: '486',
  })
  readonly password: string;
  @ApiProperty({
    description: '비밀번호 확인',
    example: '486',
  })
  readonly passwordconfirm: string;
  @ApiProperty({
    description: '사용자이름',
    example: 'todoMania',
  })
  readonly username: string;
}
