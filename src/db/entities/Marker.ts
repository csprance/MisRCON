import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Marker {
  @PrimaryGeneratedColumn() public id!: number;
  @Column('float') public posX!: number;
  @Column('float') public posY!: number;
  @Column('varchar') public content!: string;
  @Column('varchar') public layer!: string;
}
