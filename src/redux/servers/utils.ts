import { getConnection } from 'typeorm';
import Server from '../../db/entities/Server';

/*
If there are any servers mark the first one in the list active
 */
export const markServerActiveOthersInactive = async (index: number = 0) => {
  const serversRepo = await getConnection().getRepository(Server);
  const allServers = await serversRepo.find({});
  if (allServers.length > 0) {
    const servers = Promise.all(
      allServers.map(async (server, idx) =>
        serversRepo.save({ ...server, active: idx === index })
      )
    );
    console.log(servers);

    return servers;
  }
  return false;
};
