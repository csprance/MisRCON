import { Theme, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FolderIcon from '@material-ui/icons/Folder';
import * as React from 'react';

type Props = {
  classes: any;
  onClick: () => void;
};
const styles = (theme: Theme) => ({
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.secondary.main
    }
  }
});
const NoHoverIconButton = (props: Props) => {
  const { classes, onClick } = props;
  return (
    <Tooltip placement="left" title={'Select Folder'}>
      <IconButton
        onClick={onClick}
        className={classes.button}
        disableRipple
        disableTouchRipple
      >
        <FolderIcon />
      </IconButton>
    </Tooltip>
  );
};
export default withStyles(styles)(NoHoverIconButton);
