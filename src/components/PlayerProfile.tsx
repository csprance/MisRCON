import Dialog from '@material-ui/core/Dialog';
import * as React from 'react';
import styled from 'styled-components';

import Player from '../db/entities/Player';
import PlayerAvatar from "./PlayerAvatar";

const Wrapper = styled.div`
  display: flex;
  min-height: 450px;
  flex-direction: column;
  background:#2f3136;
`;
const InfoSection = styled.div`
  display: flex;
  flex-grow: 1;
  background:#202225;
`;
const NoteSection = styled.div`
  display: flex;
  flex-grow: 1;
`;

type Props = {
  player: Player;
  open: boolean;
};
const PlayerProfile: React.FunctionComponent<Props> = ({ player, open }) => {
  const [_open, setOpen] = React.useState(open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby={`${player.name} - Profile`}
      open={_open}
    >
      <Wrapper>
        <InfoSection>
          <PlayerAvatar src={player.avatarUrl} active={player.active} alt={player.name} />
          {player.name} <br />
          {player.steam}
        </InfoSection>
        <NoteSection>{player.notes}</NoteSection>
      </Wrapper>
    </Dialog>
  );
};

export default PlayerProfile;
