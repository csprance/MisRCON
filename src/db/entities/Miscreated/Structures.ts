import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Structures {
  @PrimaryGeneratedColumn() public StructureID!: number;
  @Column('integer') public GameServerID!: number;
  @Column('text') public MapName!: string;
  @Column('integer') public AccountID!: number;
  @Column('text') public ClassName!: string;
  @Column('real') public PosX!: number;
  @Column('real') public PosY!: number;
  @Column('real') public PosZ!: number;
  @Column('real') public RotX!: number;
  @Column('real') public RotY!: number;
  @Column('real') public RotZ!: number;
  @Column('integer') public AbandonTimer!: number;
  @Column('text') public Data!: string;
  @Column('text') public StructureGUID!: string;
}
