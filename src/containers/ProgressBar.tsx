import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/styles/withStyles';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { sendingSelector } from '../redux/rcon/selectors';
import { Dispatch, RootState } from '../redux/redux-types';
import { bg2, bg4 } from '../styles/colors';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const MyLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: bg4
  },
  barColorPrimary: {
    backgroundColor: bg2
  }
})(LinearProgress);

interface Props {
  sending: boolean;
}
const ProgressBar: React.FunctionComponent<Props> = ({ sending }) => {
  // sending = true;
  return <Wrapper>{sending ? <MyLinearProgress /> : <></>}</Wrapper>;
};

const mapStateToProps = (state: RootState) => ({
  sending: sendingSelector(state)
});
const mapDispatchToProps = (_dispatch: Dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
