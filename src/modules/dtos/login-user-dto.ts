import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDTO {
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
}
