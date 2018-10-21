import * as React from 'react';
import { connect } from 'react-redux';
import { Link as DOMLink } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { RootState } from '../redux/redux-types';

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

type Props = {};
type State = {
  open: boolean;
};
class ServerSelect extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {
    open: true
  };

  public handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  public render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <Typography variant={'h4'}>Server Select</Typography>
          <List
            style={{
              minHeight: 380,
              maxHeight: 380,
              overflow: 'hidden',
              overflowY: 'auto',
              width: '100%'
            }}
            component={'nav'}
          >
            {[0, 1, 2, 3].map(item => (
              <ListItem button onClick={this.handleClick} key={item}>
                <Avatar alt={'R'} src={'http://placehold.it/42x42'} />
                <ListItemText inset primary={`Dev Server ${item}`} />
                <ListItemSecondaryAction>
                  <IconButton aria-label={'Menu'}>
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            to={'/admin'}
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
export default connect(mapStateToProps)(ServerSelect);
