import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class StructureParts {
  @PrimaryGeneratedColumn() public StructurePartID!: number;
  @Column('integer') public PartTypeID!: number;
  @Column('real') public PosX!: number;
  @Column('real') public PosY!: number;
  @Column('real') public PosZ!: number;
  @Column('real') public RotZ!: number;
  @Column('text') public StructurePartGUID!: string;
  @Column('text') public Data!: string;
  @Column('text') public StructureGUID!: string;
}
