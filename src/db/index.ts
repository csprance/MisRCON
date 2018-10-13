import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import Server from './entities/Server';
import Task from './entities/Task';

export default async () => {
  // TODO: Find a better way to do this. Because HMR reloads our app each time
  // TODO: it tries to create a new connection. So here we just close and recreate it
  const opts: ConnectionOptions = {
    type: 'sqlite',
    database: 'misrcon.db',
    entities: [Server, Task],
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
