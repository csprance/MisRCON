import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Clans {
  @PrimaryGeneratedColumn() public ClanID!: number;
  @Column('integer') public GameServerID!: number;
  @Column('integer') public OwnerAccountID!: number;
  @Column('text') public ClanName!: string;
  @Column('numeric') public CreationDate!: number;
}
