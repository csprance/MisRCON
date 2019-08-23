import Dialog from '@material-ui/core/Dialog';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  height: 600px;
  max-height: 600px;
  align-items: center;
  justify-content: flex-start;
`;

const MyDialog: React.FunctionComponent<{
  title: string;
  closeDialog: () => void;
  showing: boolean;
}> = ({ children, closeDialog, showing }) => {
  return (
    <Dialog
      fullWidth
      onClose={() => closeDialog()}
      open={showing}
    >
      <Wrapper>
        <InnerWrapper>{children}</InnerWrapper>
      </Wrapper>
    </Dialog>
  );
};

export default MyDialog;
