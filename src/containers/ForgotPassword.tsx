import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link as DOMLink } from 'react-router-dom';
import styled from 'styled-components';

import FloatingBackButton from '../components/FloatingBackButton';
import MisRCONLogo from '../components/images/MisRCONLogo';
import { RootState } from '../redux/redux-types';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
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
class ForgotPassword extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  // public handleClick = () => {};

  public render() {
    return (
      <Wrapper>
        <FloatingBackButton to={'/'} />
        <InnerWrapper>
          <React.Fragment>
            <MisRCONLogo />
            <Typography variant={'h4'}>Forgot Password</Typography>
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
              Request Reset
            </Button>
          </React.Fragment>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export const mapStateToProps = (_: RootState) => ({});
export default connect(mapStateToProps)(ForgotPassword);
