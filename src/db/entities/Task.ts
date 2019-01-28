import { CronJob } from 'cron';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { OnTickFunctionFactory } from '../../redux/tasks/types';
import { functionTransformer } from './value-transformers';

@Entity()
export default class Task {
  // The id of the task
  @PrimaryGeneratedColumn()
  public id!: number;

  // The time zone of the task
  @Column('text')
  public timeZone!: string;

  // the nice name of the task
  @Column('text')
  public name!: string;

  // Is the task currently running
  @Column('boolean')
  public active!: boolean;

  // The cron string for the task * * * * * * or null if it's a task with a date
  @Column({ type: 'text', nullable: true })
  public cronString!: string | null;

  // When the task should be executed exactly or null if it's a recurring task
  @Column({ type: 'datetime', nullable: true, default: null })
  public date!: Date | null;

  // What server the task is executed on
  @Column('integer')
  public serverId!: number;

  // The cron job or null if there is no cron created for it yet
  @Column({ type: 'text', nullable: true, default: null })
  public job!: CronJob | null;

  // on tick is a Factory Function
  // It evals to a function that accepts dispatch, getState and returns an async function
  @Column({ type: 'text', transformer: functionTransformer })
  public onTick!: OnTickFunctionFactory;
}
