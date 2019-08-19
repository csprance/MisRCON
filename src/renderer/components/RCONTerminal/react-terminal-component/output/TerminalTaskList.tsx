import * as React from 'react';
import styled from 'styled-components';

import { TasksState } from '../../../../redux/tasks';

const Id = styled.div`
  min-width: 50px;
  max-width: 80px;
  flex-grow: 1;
  text-overflow: ellipsis;
`;
const Name = styled.div`
  min-width: 50px;
  flex-grow: 5;
  max-width: 200px;
  text-overflow: ellipsis;
`;
const CronString = styled.div`
  min-width: 50px;
  flex-grow: 1;
`;
const Active = styled.div`
  min-width: 50px;
  flex-grow: 1;
`;
const Task = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props: { header?: boolean }) =>
    props.header ? 'silver' : 'inherit'};
`;

export default ({ tasks }: { tasks: TasksState }) => (
  <div>
    <Task header>
      <Id>ID</Id>
      <Name>Name</Name>
      <CronString>Cron String</CronString>
      <Active> Active </Active>
    </Task>
    {tasks.map((task, idx) => (
      <Task
        key={task.id + Date.now() + idx}
        style={{ color: task.active ? 'green' : 'red' }}
      >
        <Id>{task.id}</Id>
        <Name>{task.name}</Name>
        <CronString>{task.cronString}</CronString>
        <Active>{task.active ? 'true' : 'false'}</Active>
      </Task>
    ))}
  </div>
);
