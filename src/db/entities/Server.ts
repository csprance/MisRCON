import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Server {
  @PrimaryGeneratedColumn() public id!: number;
  @Column('varchar') public name!: string;
  @Column('varchar') public ip!: string;
  @Column('integer') public port!: number;
  @Column('varchar') public hash!: string;
  @Column('boolean') public active!: boolean;
  @Column('boolean') public selfHosted!: boolean;
  @Column('varchar') public rootPath!: string;
}
