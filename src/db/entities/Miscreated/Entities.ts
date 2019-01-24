import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Entities {
  @PrimaryGeneratedColumn() public EntityID!: number;
  @Column('integer') public GameServerID!: number;
  @Column('text') public MapName!: string;
  @Column('text') public ClassName!: string;
  @Column('real') public PosX!: number;
  @Column('real') public PosY!: number;
  @Column('real') public PosZ!: number;
  @Column('real') public RotZ!: number;
  @Column('text') public Data!: string;
  @Column('text') public EntityGUID!: string;
}
