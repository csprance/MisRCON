import { ConnectionOptions, createConnection, getConnection } from 'typeorm';

import Marker from './entities/Marker';
import Server from './entities/Server';
import Task from './entities/Task';

export default async () => {
  const opts: ConnectionOptions = {
    type: 'sqlite',
    database: 'misrcon.db',
    entities: [Server, Task, Marker],
    synchronize: true,
    logging: false
  };
  try {
    await createConnection(opts);
  } catch (e) {
    const connection = getConnection();
    await connection.close();
    await createConnection(opts);
  }
};
