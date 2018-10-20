import { ConnectionOptions, createConnection, getConnection } from 'typeorm';

import Markers from './entities/Markers';
import Server from './entities/Server';
import Task from './entities/Task';

export default async () => {
  const opts: ConnectionOptions = {
    type: 'sqlite',
    database: 'misrcon.db',
    entities: [Server, Task, Markers],
    synchronize: true,
    logging: false
  };
  try {
    await createConnection(opts);
  } catch (e) {
    const connection = getConnection();
    await connection.close();
    await createConnection(opts);
    console.log('Recreated DB After Reload');
  }
};
