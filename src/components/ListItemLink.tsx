import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

type Props = {
  primary: string;
  to: string;
};
class ListItemLink extends React.Component<Props & RouteComponentProps> {

  renderLink = (itemProps: any) => (
    <Link to={this.props.to} {...itemProps} data-next="true" />
  );

  render() {
    const { primary } = this.props;
    return (
        <ListItem button component={this.renderLink}>
          <ListItemText primary={primary} />
        </ListItem>
    );
  }
}

export default withRouter(ListItemLink);
