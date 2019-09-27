import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/FolderOpen';
import ReloadIcon from '@material-ui/icons/Refresh';
import { highlight, languages } from 'prismjs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';

import { setHostingPath, setHostingText } from '../redux/hosting/actions';
import {
  activeServerHostingPathSelector,
  activeServerHostingTextSelector
} from '../redux/hosting/selectors';
import { activeServerIDSelector } from '../redux/servers/selectors';
import { bg1, text } from '../styles/colors';

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;
const EditorWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  & textarea {
    outline: none;
  }
`;

interface Props {}
const HostingContainer: React.FunctionComponent<Props> = ({}) => {
  // State
  const hostingPath = useSelector(activeServerHostingPathSelector);
  const hostingText = useSelector(activeServerHostingTextSelector);
  const activeServerID = useSelector(activeServerIDSelector);
  // Actions
  const dispatch = useDispatch();
  const updateHostingPath = (e: any) =>
    dispatch(setHostingPath(e.target.value, activeServerID));
  const updateHostingText = (value: string) =>
    dispatch(setHostingText(value, activeServerID));

  return (
    <EditorWrapper>
      <HeaderBar>
        <Button>
          <FolderIcon />
        </Button>
        <Button>
          <ReloadIcon />
        </Button>
        <div style={{ paddingLeft: 10, paddingRight: 10, width: '100%' }}>
          <TextField
            fullWidth
            name={'path'}
            onChange={updateHostingPath}
            value={hostingPath}
          />
        </div>
        <Button>Save</Button>
      </HeaderBar>
      <Editor
        value={hostingText}
        onValueChange={updateHostingText}
        highlight={newCode => highlight(newCode, languages.js, 'js')}
        padding={10}
        style={{
          height: '100%',
          overflowY: 'scroll',
          backgroundColor: bg1,
          color: text.primary,
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12
        }}
      />
    </EditorWrapper>
  );
};

export default HostingContainer;
