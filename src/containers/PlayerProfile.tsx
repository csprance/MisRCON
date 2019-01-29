import Dialog from '@material-ui/core/Dialog';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PlayerAvatar from '../components/PlayerAvatar';
import Player from '../db/entities/Player';
import { togglePlayerProfileDialog } from '../redux/app/actions';
import { makePlayerByPartialSelector } from '../redux/players/selectors';
import { Dispatch, RootState } from '../redux/redux-types';

const Wrapper = styled.div`
  display: flex;
  min-height: 450px;
  flex-direction: column;
  background: #2f3136;
`;
const InfoSection = styled.div`
  display: flex;
  flex-grow: 1;
  background: #202225;
`;
const NoteSection = styled.div`
  display: flex;
  flex-grow: 1;
`;
const ColoredText = styled.div`
  color: ${({ color }) => color};
`;
const SteamText = styled.div`
  color: ${({ color }) => color};
`;
const LeftSide = styled.div``;
const RightSide = styled.div``;

type Props = {
  player: Player | null;
  open: boolean;
  closeDialog: () => void;
};
const PlayerProfile: React.FunctionComponent<Props> = ({
  player,
  open,
  closeDialog
}) => {
  if (!player) {
    closeDialog();
    return <div />;
  }
  return (
    <Dialog fullWidth onClose={() => closeDialog()} open={open}>
      <Wrapper>
        <InfoSection>
          <LeftSide>
            <PlayerAvatar
              src={player.avatarUrl}
              active={player.active}
              alt={player.name}
            />
          </LeftSide>
          <RightSide>
            <ColoredText>{player.name}</ColoredText>
            <SteamText>{player.steam}</SteamText>
          </RightSide>
        </InfoSection>
        <NoteSection>{player.notes}</NoteSection>
      </Wrapper>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => {
  const getPlayerBySteam = makePlayerByPartialSelector({
    steam: state.app.selectedPlayerID
  });
  const player = getPlayerBySteam(state);
  if (player) {
    return {
      open: state.app.playerProfileDialog,
      player
    };
  }
  return {
    open: state.app.playerProfileDialog,
    player: null
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDialog: () => dispatch(togglePlayerProfileDialog())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerProfile);
