import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { noop } from '../lib/utils';

// import { toggleUpdateServerDialog } from '../redux/app/actions';
import { RootState } from '../redux/redux-types';
import {
  getServerDataThunk,
  removeServerThunk
} from '../redux/servers/actions';
import { serverByIdSelector } from '../redux/servers/selectors';
import { bg5 } from '../styles/colors';
import ServerPropertiesMenu from './Menus/ServerPropertiesMenu';

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 8px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ActiveIndicatorWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 10px;
  margin-left: -5px;
`;
const ActiveIndicator = styled.div`
  background: ${({ active }: { active: boolean }) => (!active ? bg5 : '#fff')};
  transition-duration: 0.3s;
  width: 10px;
  border-radius: 2pt;
  margin-left: -33px;
  margin-top: ${({ active }: { active: boolean }) =>
    active ? '15px' : '29px'};
  height: ${({ active }: { active: boolean }) => (active ? '35px' : '8px')};
`;

interface Props {
  active: boolean;
  avatarURL: string;
  id: number;
  name: string;
  selectServer: (id: number) => void;
}
const ServerAvatar: React.FunctionComponent<Props> = ({
  avatarURL,
  id,
  name,
  selectServer,
  active
}) => {
  const dispatch = useDispatch();
  const server = useSelector((state: RootState) =>
    serverByIdSelector(state, { id })
  );
  // const toggleEditServerDialog = () => dispatch(toggleUpdateServerDialog());
  const refreshServerData = () =>
    server ? dispatch(getServerDataThunk(server)) : noop();
  const deleteServer = () => dispatch(removeServerThunk(id));

  const [borderRadius, setBorderRadius] = React.useState('50%');

  const handleServerClick = () => {
    selectServer(id);
  };

  const handleMouseLeave = () => {
    setBorderRadius('50%');
  };

  const handleMouseEnter = () => {
    setBorderRadius('15px');
  };

  const [anchorEl, setAnchor] = React.useState(null);

  const handleRightClick = (event: any) => {
    event.preventDefault();
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <ServerPropertiesMenu
        refreshServerData={refreshServerData}
        anchorEl={anchorEl}
        deleteServer={deleteServer}
        handleClose={handleClose}
      />
      <Wrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleServerClick}
      >
        <ActiveIndicatorWrapper>
          <ActiveIndicator active={active} />
        </ActiveIndicatorWrapper>
        <Tooltip placement={'right'} title={name}>
          <Avatar
            onContextMenu={handleRightClick}
            style={{
              width: 50,
              height: 50,
              marginTop: 8,
              borderRadius: active ? '15px' : borderRadius,
              transitionDuration: '0.3s'
            }}
            src={avatarURL}
          />
        </Tooltip>
      </Wrapper>
    </>
  );
};

export default ServerAvatar;
