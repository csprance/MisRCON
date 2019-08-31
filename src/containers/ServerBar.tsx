import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AddServerButton from '../components/AddServerButton';
import ServerAvatar from '../components/ServerAvatar';
import { toggleAddServerDialog } from '../redux/app/actions';
import {
  markServerActiveThunk,
  reorderServers
} from '../redux/servers/actions';
import {
  activeServerSelector,
  serversSelector
} from '../redux/servers/selectors';
import { bg0 } from '../styles/colors';

const Wrapper = styled.div`
  display: flex;
  background: ${bg0};
  flex-grow: 1;
  width: 70px;
  min-width: 70px;
  max-width: 70px;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

interface Props {}
const ServerBar: React.FunctionComponent<Props> = ({}) => {
  const servers = useSelector(serversSelector);
  const activeServer = useSelector(activeServerSelector);
  const dispatch = useDispatch();
  const selectServer = (id: number) => dispatch(markServerActiveThunk(id));
  const showAddServerDialog = () => dispatch(toggleAddServerDialog());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    dispatch(reorderServers(result.source.index, result.destination.index));
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="server-bar-dropable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {servers.map((server, index) => (
                <Draggable
                  key={server.id}
                  draggableId={`${server.id}`}
                  index={index}
                >
                  {(_provided, _snapshot) => (
                    <div
                      ref={_provided.innerRef}
                      {..._provided.draggableProps}
                      {..._provided.dragHandleProps}
                    >
                      <ServerAvatar
                        active={activeServer.id === server.id}
                        key={server.id}
                        selectServer={selectServer}
                        id={server.id}
                        name={server.name}
                        avatarURL={server.avatar}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddServerButton showAddServerDialog={showAddServerDialog} />
    </Wrapper>
  );
};

export default ServerBar;
