import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Lock from '@material-ui/icons/Lock';
import AccountCircle from '@material-ui/icons/SupervisorAccount';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link as DOMLink } from 'react-router-dom';
import styled from 'styled-components';

import MisRCONLogo from '../components/images/MisRCONLogo';
import Link from '../components/Link';
import { RootState } from '../redux/redux-types';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const FormWrapper = styled(Paper)`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  height: 500px;
  align-items: center;
  justify-content: space-evenly;
`;
const Row = styled.div`
  display: flex;
  flex-grow: 1;
  max-height: 30px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Spacer = styled.div`
  flex-grow: 1;
`;

type Props = {};
type State = {};
class Login extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    return (
      <Wrapper>
        <FormWrapper>
          <MisRCONLogo />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            label={'Username'}
            fullWidth
            name={'username'}
            style={{ marginBottom: 25 }}
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <Lock />
                </InputAdornment>
              )
            }}
            fullWidth
            label={'Password'}
            type={'password'}
            name={'password'}
            style={{ marginBottom: 25 }}
          />
          <Row style={{ marginBottom: 25 }}>
            <FormControlLabel
              control={<Checkbox value={'rememberPassword'} />}
              label={'Remember Password'}
            />
            <Spacer />
            <Link to={'/forgot'}>
              <Typography>Forgot Password</Typography>
            </Link>
          </Row>
          <Button
            to={'/select'}
            // @ts-ignore
            component={DOMLink}
            fullWidth
            variant={'contained'}
            color={'primary'}
            style={{ marginBottom: 25 }}
          >
            Login
          </Button>
          <Row>
            <Link to={'/create'}>
              <Typography>New User? Create account.</Typography>
            </Link>
          </Row>
        </FormWrapper>
      </Wrapper>
    );
  }
}

export const mapStateToProps = (_: RootState) => ({});
export default connect(mapStateToProps)(Login);
