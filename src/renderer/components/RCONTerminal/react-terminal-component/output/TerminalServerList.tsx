import * as React from 'react';
import styled from 'styled-components';

import { ServersState } from '../../../../redux/servers';

const Id = styled.div`
  min-width: 50px;
  max-width: 150px;
  flex-grow: 1;
  text-overflow: ellipsis;
`;
const Name = styled.div`
  min-width: 50px;
  flex-grow: 5;
  max-width: 250px;
  text-overflow: ellipsis;
`;
const Ip = styled.div`
  min-width: 50px;
  flex-grow: 1;
`;
const Port = styled.div`
  min-width: 50px;
  max-width: 85px;
  flex-grow: 1;
`;
const Active = styled.div`
  min-width: 50px;
  flex-grow: 1;
`;
const Server = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props: { header?: boolean }) =>
    props.header ? 'silver' : 'inherit'};
`;

export default ({ servers }: { servers: ServersState }) => (
  <div>
    <Server header>
      <Id>id</Id>
      <Name>name</Name>
      <Ip>ip</Ip>
      <Port>port</Port>
      <Active>active </Active>
    </Server>
    {servers.map((server, idx) => (
      <Server
        key={server.id + Date.now() + idx}
        style={{ color: server.active ? 'green' : 'red' }}
      >
        <Id>{server.id}</Id>
        <Name>{server.name}</Name>
        <Ip>{server.ip}</Ip>
        <Port>{server.port}</Port>
        <Active>{server.active ? 'true' : 'false'}</Active>
      </Server>
    ))}
  </div>
);
