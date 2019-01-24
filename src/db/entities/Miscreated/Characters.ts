import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Characters {
  @PrimaryGeneratedColumn() public CharacterID!: number;
  @Column('integer') public GameServerID!: number;
  @Column('integer') public AccountID!: number;
  @Column('real') public PosX!: number;
  @Column('real') public PosY!: number;
  @Column('real') public PosZ!: number;
  @Column('real') public RotZ!: number;
  @Column('real') public Health!: number;
  @Column('real') public Food!: number;
  @Column('real') public Water!: number;
  @Column('real') public Radiation!: number;
  @Column('real') public Temperature!: number;
  @Column('numeric') public CreationDate!: number;
  @Column('text') public SelectedSlot!: string;
  @Column('text') public MapName!: string;
  @Column('integer') public Gender!: number;
  @Column('text') public Data!: string;
  @Column('text') public CharacterGUID!: string;
}
