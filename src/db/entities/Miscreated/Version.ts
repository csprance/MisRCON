import { Column, Entity } from 'typeorm';

@Entity()
export default class Version {
  @Column('integer') public Version!: number;
}
