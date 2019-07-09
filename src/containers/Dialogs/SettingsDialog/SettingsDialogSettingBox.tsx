import Divider from '@material-ui/core/Divider';
import * as React from 'react';
import styled from 'styled-components';
import { text } from '../../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  //justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 10px;
`;

const SettingName = styled.div`
  font-size: 1em;
  font-weight: 600;
  color: ${text.primary};
  justify-content: left;
  width: 100%;
  margin-bottom: 20px;
`;
const SettingDescription = styled.div`
  width: 100%;
  color: ${text.secondary};
  margin-bottom: 30px;
`;
const ActionWrapper = styled.div`
  width: 100%;
`;

interface Props {
  name: string;
  description: string;
}
const SettingsDialogSettingBox: React.FunctionComponent<Props> = ({
  children,
  name,
  description
}) => {
  return (
    <Wrapper>
      <SettingName>{name}</SettingName>
      <SettingDescription>{description}</SettingDescription>
      <ActionWrapper>{children}</ActionWrapper>
      <Divider style={{marginTop: 50, width: '100%'}} light variant={'fullWidth'} />
    </Wrapper>
  );
};

export default SettingsDialogSettingBox;
