import Button from '@material-ui/core/Button';
import * as React from 'react';
import styled from 'styled-components';
import SettingsDialogSettingBox from './SettingsDialogSettingBox';

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
const DatabaseSettingsSection: React.FunctionComponent<Props> = ({}) => {
  return (
    <Wrapper>
      <AlignLeft>Database</AlignLeft>
      <SettingsDialogSettingBox
        name={'Clear Database'}
        description={'Delete all the internal application state and start over'}
      >
        <Button color={'secondary'} variant={'contained'}>
          Clear Database
        </Button>
      </SettingsDialogSettingBox>
    </Wrapper>
  );
};

export default DatabaseSettingsSection;
