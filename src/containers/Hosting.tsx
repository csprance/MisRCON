import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Dispatch, RootState } from '../redux/redux-types';

const Wrapper = styled.div`
  display: flex;
`;

interface Props {}
interface ReduxProps {}
const HostingContainer: React.FunctionComponent<Props & ReduxProps> = ({
  children
}) => {
  return <Wrapper>{children}</Wrapper>;
};

const mapStateToProps = (_state: RootState, _ownProps: Props) => ({
  hosting: ''
});
const mapDispatchToProps = (_dispatch: Dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(HostingContainer);
