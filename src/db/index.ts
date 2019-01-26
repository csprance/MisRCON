import { ConnectionOptions, createConnection, getConnection } from 'typeorm';

import Marker from './entities/Marker';
import Player from './entities/Player';
import Server from './entities/Server';
import Task from './entities/Task';

export default async () => {
  const opts: ConnectionOptions = {
    type: 'sqlite',
    database: 'misrcon.db',
    entities: [Server, Task, Marker, Player],
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
