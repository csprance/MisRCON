import * as mousetrap from 'mousetrap';
import * as React from 'react';
import styled from 'styled-components';

import Admin from '../../containers/Terminal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;
const Hider = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props: { show: boolean }) => (props.show ? 'flex' : 'none')};
`;

export interface InjectedProps {
  showing?: boolean;
}
export interface ExternalProps {
  style?: React.CSSProperties;
}
export default <TOriginalProps extends {}>(
  Component:
    | React.ComponentClass<TOriginalProps & InjectedProps>
    | React.FunctionComponent<TOriginalProps & InjectedProps>
) => {
  type ResultProps = TOriginalProps & ExternalProps;
  return class extends React.Component<ResultProps> {
    public state = {
      show: true
    };
    constructor(props: ResultProps) {
      super(props);
    }

    componentDidMount() {
      // Bind the tilda key to open the console
      mousetrap.bind('`', () => {
        this.setState({
          show: !this.state.show
        });
      });
    }

    componentWillUnmount(): void {
      mousetrap.unbind('`');
    }

    render() {
      const { show } = this.state;
      const { ...restProps } = this.props as {};
      return (
        <Wrapper>
          <Component {...this.props} showing={show} />
          <Hider show={show}>
            <Admin {...restProps} />
          </Hider>
        </Wrapper>
      );
    }
  };
};
