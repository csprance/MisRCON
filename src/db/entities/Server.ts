import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { passwordTransformer } from './value-transformers';

@Entity()
export default class Server {
  @PrimaryGeneratedColumn() public id!: number;
  // The nice name of the server
  @Column('text') public name!: string;
  // The ip port of the server 192.168.1.1
  @Column('text') public ip!: string;
  // The port 64094
  @Column('integer') public port!: number;
  // The RCON passsword this is transformed using a static salt
  @Column({ type: 'text', transformer: passwordTransformer })
  public password!: string;
  // Is the server currently active
  @Column('boolean') public active!: boolean;
  // Is it a self hosted server?
  @Column('boolean') public selfHosted!: boolean;
  // The root path for the self hosted server
  @Column({ type: 'text', nullable: true }) public rootPath!: string;
  // The location of the avatar for the server
  @Column({ type: 'text', default: 'http://placehold.it/50x50' })
  public avatar!: string;
}
