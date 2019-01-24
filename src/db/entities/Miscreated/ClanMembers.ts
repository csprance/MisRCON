import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ClanMembers {
  @PrimaryGeneratedColumn() public ClanMemberID!: number;
  @Column('integer') public ClanID!: number;
  @Column('integer') public AccountID!: number;
  @Column('text') public MemberName!: string;
  @Column('integer') public IsAdmin!: number;
  @Column('integer') public CanAlterMembers!: number;
  @Column('integer') public CanAlterParts!: number;
  @Column('integer') public CanAlterLocks!: number;
  @Column('integer') public CanAlterPower!: number;
}
