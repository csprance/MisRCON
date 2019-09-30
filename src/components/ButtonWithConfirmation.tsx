import Button, { ButtonProps } from '@material-ui/core/Button';
import * as React from 'react';

import ConfirmationDialog from './ConfirmationDialog';

interface Props {
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}
const ButtonWithConfirmation: React.FunctionComponent<Props & ButtonProps> = ({
  onCancel = null,
  onConfirm,
  title,
  description,
  children,
  ...buttonProps
}) => {
  const [open, setOpen] = React.useState(false);
  if (onCancel === null) {
    onCancel = () => setOpen(false);
  }
  return (
    <>
      {open ? (
        // Confirmation Dialog for Delete Server
        <ConfirmationDialog
          onCancel={onCancel}
          onConfirm={() => {
            onConfirm();
            setOpen(false);
          }}
          title={title}
          description={description}
        />
      ) : null}
      <Button onClick={() => setOpen(true)} {...buttonProps}>
        {children}
      </Button>
    </>
  );
};
export default ButtonWithConfirmation;
