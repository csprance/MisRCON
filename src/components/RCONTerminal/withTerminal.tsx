/*
Takes a Component and Returns a wrapped Component with a terminal window. That triggers on the ` key
 */
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import styled from 'styled-components';
import Admin from '../../containers/Admin';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex-grow: 1;
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
    | React.StatelessComponent<TOriginalProps & InjectedProps>
) => {
  type ResultProps = TOriginalProps & ExternalProps;
  return class extends React.Component<ResultProps> {
    public state = {
      show: false
    };
    constructor(props: ResultProps) {
      super(props);
    }

    componentDidMount() {
      mousetrap.bind('`', () => {
        this.setState({
          show: !this.state.show
        });
      });
    }

    render() {
      const { show } = this.state;
      return (
        <Wrapper>
          <Component {...this.props} showing={show} />
          <div style={{width: '100%', height: '100%', display: show ? 'flex': 'none' }}>
            <Admin {...this.props} />
          </div>
        </Wrapper>
      );
    }
  };
};
