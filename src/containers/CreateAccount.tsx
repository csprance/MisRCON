import * as React from 'react';
import { Link as DOMLink } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import MisRCONLogo from '../components/images/MisRCONLogo';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled(Paper)`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  height: 500px;
  max-height: 500px;
  align-items: center;
  justify-content: flex-start;
`;
const CenterSection = styled.div`
  min-height: 220px;
  max-height: 220px;
`;

type Props = {};
type State = {};
class CreateAccount extends React.Component<Props, State> {
  static defaultProps = {};
  state = {};

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <MisRCONLogo />
          <Typography variant={'display1'}>Create Account</Typography>
          <CenterSection>
            <TextField fullWidth name={'email'} label={'Email'} />
            <TextField fullWidth name={'username'} label={'Username'} />
            <TextField
              fullWidth
              name={'password'}
              label={'Password'}
              type={'password'}
            />
          </CenterSection>
          <Button
            to={'/'}
            // @ts-ignore
            component={DOMLink}
            variant={'contained'}
            color={'primary'}
            fullWidth
          >
            Add Account
          </Button>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default CreateAccount;
