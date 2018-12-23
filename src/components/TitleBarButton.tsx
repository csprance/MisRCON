import CloseIcon from '@material-ui/icons/CloseOutlined';
import MaximizeIcon from '@material-ui/icons/CropSquareRounded';
import MinimizeIcon from '@material-ui/icons/Remove';
import { remote } from 'electron';
import * as React from 'react';
import styled from 'styled-components';


export const ButtonBase = styled.button`
  color: #e3e3e3;
  outline: none;
  width: 45px;
  height: 31px;
  border: none;
  background-color: ${(props: { bg: string }) => props.bg};
  cursor: pointer;
  -webkit-app-region: no-drag;
  transition-duration: 0.2s;
  position: relative;
  display: flex;
  top: -2px;
  align-items: center;
  justify-content: center;
`;

interface Props {
  readonly type: 'minimize' | 'maximize' | 'close';
}
interface State {
  readonly bg: string;
}
class TitleBarButton extends React.Component<Props, State> {
  static defaultProps = {};
  hoverColorClose: string;
  hoverColor: string;
  bgColor: string;
  public state: State = {
    bg: 'transparent'
  };

  constructor(props: Props) {
    super(props);
    this.hoverColorClose = '#ee4646';
    this.hoverColor = '#4d4d4d';
    this.bgColor = 'transparent';
  }

  handleClick = () => {
    const focusedWindow = remote.BrowserWindow.getFocusedWindow()!;
    switch (this.props.type) {
      case 'minimize':
        return focusedWindow.minimize();
      case 'maximize':
        if (focusedWindow.isMaximized()) {
          return focusedWindow.unmaximize();
        } else {
          return focusedWindow.maximize();
        }
      case 'close':
        return focusedWindow.close();
      default:
        break;
    }
  };

  handleMouserEnter = () => {
    this.setState({
      bg: this.props.type === 'close' ? this.hoverColorClose : this.hoverColor
    });
  };

  handleMouseLeave = () => {
    this.setState({
      bg: this.bgColor
    });
  };

  public render() {
    return (
      <ButtonBase
        bg={this.state.bg}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouserEnter}
        onClick={this.handleClick}
      >
        {this.props.type === 'close' && <CloseIcon style={{ width: 20 }} />}
        {this.props.type === 'minimize' && (
          <MinimizeIcon style={{ width: 20 }} />
        )}
        {this.props.type === 'maximize' && (
          <MaximizeIcon style={{ width: 20 }} />
        )}
      </ButtonBase>
    );
  }
}

export default TitleBarButton;
