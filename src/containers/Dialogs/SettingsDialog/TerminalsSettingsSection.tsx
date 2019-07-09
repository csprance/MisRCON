import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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

interface Props {
  themeName: string;
  deleteAllTerminals: () => void;
  handleTerminalThemeChange: (themeName: string) => void;
}
const TerminalSettingsSection: React.FunctionComponent<Props> = ({
  deleteAllTerminals,
  handleTerminalThemeChange,
  themeName
}) => {
  return (
    <Wrapper>
      <AlignLeft>Terminals</AlignLeft>
      <SettingsDialogSettingBox
        name={'Clear Terminals'}
        description={
          'Clear are the terminals the user has. This is helpful when things go wrong.'
        }
      >
        <Button
          color={'secondary'}
          variant={'contained'}
          onClick={() => deleteAllTerminals()}
        >
          Clear All Terminals
        </Button>
      </SettingsDialogSettingBox>
      <SettingsDialogSettingBox
        name={'Terminal Theme'}
        description={'Select the terminal theme for the console.'}
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value={themeName}
            fullWidth
            onChange={val => handleTerminalThemeChange(val.target.value)}
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={'dye'}>Dye</MenuItem>
            <MenuItem value={'ember'}>Ember</MenuItem>
            <MenuItem value={'forest'}>Forest</MenuItem>
            <MenuItem value={'hacker'}>Hacker</MenuItem>
            <MenuItem value={'light'}>Light</MenuItem>
            <MenuItem value={'magpie'}>Magpie</MenuItem>
            <MenuItem value={'sea'}>Sea</MenuItem>
          </Select>
        </FormControl>
      </SettingsDialogSettingBox>
    </Wrapper>
  );
};

export default TerminalSettingsSection;
