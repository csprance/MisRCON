import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public json: string;
}