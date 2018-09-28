import * as React from 'react';
import XTerm from 'react-xterm';

type Props = {};
type State = {};

class RCONTerminal extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    return <XTerm ref='xterm'/>;
  }
}

export default RCONTerminal;
