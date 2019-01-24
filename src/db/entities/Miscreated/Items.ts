import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Items {
  @PrimaryGeneratedColumn() public ItemID!: number;
  @Column('text') public Slot!: string;
  @Column('text') public ClassName!: string;
  @Column('text') public Data!: string;
  @Column('text') public ItemGUID!: string;
  @Column('text') public ParentGUID!: string;
  @Column('text') public OwnerGUID!: string;
}
