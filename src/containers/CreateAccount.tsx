import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link as DOMLink } from 'react-router-dom';
import styled from 'styled-components';

import FloatingBackButton from '../components/FloatingBackButton';
import MisRCONLogo from '../components/images/MisRCONLogo';
import { RootState } from '../redux/redux-types';
import { MyPaper } from '../styles/MyStyledComponents';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled(MyPaper)`
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
        <FloatingBackButton to={'/'} />
        <InnerWrapper>
          <MisRCONLogo />
          <Typography variant={'h4'}>Create Account</Typography>
          <Typography variant={'body2'} align={'center'}>
            An account will help keep all of your servers data secure under one
            common username and password
          </Typography>
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

export const mapStateToProps = (_: RootState) => ({});
export default connect(mapStateToProps)(CreateAccount);
