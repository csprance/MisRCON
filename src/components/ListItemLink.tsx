import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  // Primary Text
  primary: string;
  // Link to
  to: string;
  // What the current path is
  currentPath: string;
}
const ListItemLink: React.FunctionComponent<Props> = ({
  primary,
  to,
  currentPath
}) => {
  const renderLink = React.forwardRef((props, _ref) => (
    <Link to={to} {...props} />
  ));

  return (
    // @ts-ignore
    <ListItem selected={currentPath === to} button component={renderLink}>
      <ListItemText primary={primary} />
    </ListItem>
  );
};

export default ListItemLink;
