import { 
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
 } from "typeorm";

import { IsString, IsEmail  } from "class-validator";

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    username: string;

    @Column()
    @IsString()
    password: string;

    @Column()
    @IsEmail()
    email: string;
}