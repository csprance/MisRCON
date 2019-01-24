import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Entities {
  @PrimaryGeneratedColumn() public ServerAccountDataID!: number;
  @Column('integer') public GameServerID!: number;
  @Column('integer') public AccountID!: number;
  @Column('integer') public Guide00!: number;
  @Column('integer') public Guide01!: number;
  @Column('integer') public Guide02!: number;
  @Column('integer') public Guide03!: number;
  @Column('integer') public ClanID!: number;
  @Column('integer') public IsPendingClanInvite!: number;
  @Column('integer') public IgnoreClanInvites!: number;
}
