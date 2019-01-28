import { Column, Entity, PrimaryColumn } from 'typeorm';

import { theme } from '../../styles/theme';
import { jsonTransformer } from './value-transformers';

@Entity()
export default class Player {
  // /////////////////////
  // Application Values - These are internal values from the application to use
  // ///////////////
  // What server the player is currently on or was last on or null if they are not on a server
  @Column({ type: 'boolean', default: true }) public active!: boolean;
  // The current or last server the player was on
  @Column('integer') public serverID!: number;
  // A url to steam of the players avatar
  @Column({
    type: 'text',
    default: 'https://placehold.it/32x32'
  })
  public avatarUrl!: string;
  // The color of the players name
  @Column({ type: 'text', default: theme.palette.text.primary })
  public color!: string;
  // Any custom notes about the player
  @Column({ type: 'text', default: '' }) public notes!: string;
  // An array of ServerIDS the player is banned on
  @Column({
    type: 'text',
    transformer: jsonTransformer,
    default: '"[]"'
  })
  public banned!: number[];
  // A list of the servers a player is whitelisted on
  @Column({
    type: 'text',
    transformer: jsonTransformer,
    default: '"[]"'
  })
  public whitelisted!: number[];

  // /////////////////////
  // RCON Values - These all come from the servers status result
  // ///////////////
  // The players Steam ID
  @PrimaryColumn({ type: 'integer' }) public steam!: number;
  // The players name on the server
  @Column('text') public name!: string;
  // A value from the rcon response that is the id of the player on the server
  @Column('integer') public id!: number;
  @Column('integer') public entID!: number;
  @Column('text') public ip!: string;
  @Column('integer') public ping!: number;
  @Column('integer') public state!: number;
  @Column('integer') public profile!: number;
}
