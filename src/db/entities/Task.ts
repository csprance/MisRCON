import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn() public id: number;
  @Column('varchar') public timeZone: string;
  @Column('varchar') public name: string;
  @Column('boolean') public active: boolean;
  @Column('varchar') public jobString: string;
  // nullable types
  @Column({ type: 'varchar', name: 'cronString', nullable: true })
  public cronString: string | null;
  @Column({ type: 'datetime', name: 'date', nullable: true })
  public date: Date | null;
}
