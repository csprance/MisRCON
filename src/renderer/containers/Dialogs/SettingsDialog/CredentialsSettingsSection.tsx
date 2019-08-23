import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import styled from 'styled-components';
import SettingsDialogSettingBox from './SettingsDialogSettingBox';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  //justify-content: center;
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
const CredentialsSettingsSection: React.FunctionComponent<Props> = ({}) => {
  return (
    <Wrapper>
      <AlignLeft>Secrets Storage</AlignLeft>
      <SettingsDialogSettingBox
        name={'Credentials Salt'}
        description={
          'What should we use as a salt to store the passwords of your server.'
        }
      >
        <TextField fullWidth value={process.env.COMPUTERNAME} name={'salt'} label={'Credentials Salt'} />
      </SettingsDialogSettingBox>
    </Wrapper>
  );
};

export default CredentialsSettingsSection;
