import { ApiProperty } from '@nestjs/swagger';

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    example: '2023-09-19T00:00:00.000Z',
    description: '생성일',
    required: true,
  })
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty({
    example: '2023-09-19T00:00:00.000Z',
    description: '수정일',
  })
  @UpdateDateColumn()
  updatedAt: Date; //👀

  @ApiProperty({
    example: '2023-09-19T00:00:00.000Z',
    description: '삭제일',
  })
  @DeleteDateColumn()
  deletedAt: Date;  //👀
}