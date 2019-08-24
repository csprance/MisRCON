import Button from '@material-ui/core/Button';
import * as React from 'react';
import styled from 'styled-components';
import SettingsDialogSettingBox from './SettingsDialogSettingBox';
import { useDispatch } from 'react-redux';
import { deleteAllPlayers } from '../../../redux/players/actions';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;
const AlignLeft = styled.div`
  width: 100%;
  justify-content: left;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  padding: 5px;
`;

interface Props {}
const StateSettingsSection: React.FunctionComponent<Props> = ({}) => {
  const dispatch = useDispatch();
  const deletePlayers = () => dispatch(deleteAllPlayers());
  return (
    <Wrapper>
      <AlignLeft>State</AlignLeft>
      <SettingsDialogSettingBox
        name={'Clear Players'}
        description={
          'Delete all internal Players application state. This is helpful for when player are not showing up correctly or missing avatars.'
        }
      >
        <Button
          onClick={deletePlayers}
          color={'secondary'}
          variant={'contained'}
        >
          Clear Players
        </Button>
      </SettingsDialogSettingBox>
    </Wrapper>
  );
};

export default StateSettingsSection;
