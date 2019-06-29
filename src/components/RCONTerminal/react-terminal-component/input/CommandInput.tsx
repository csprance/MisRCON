import * as React from 'react';

import PromptSymbol from '../PromptSymbol';
import StyledForm from './StyledForm';
import StyledInput from './StyledInput';

type Props = {
  onSubmit: (value: any) => any;
  onChange: (e: any) => any;
  onKeyDown: (e: any) => any;
  promptSymbol: string;
  value: string;
  disabled: boolean;
};
type State = {};
class CommandInput extends React.Component<Props, State> {
  input: any;

  scrollIntoView() {
    this.input.scrollIntoView();
  }

  focus(){
    this.input.focus();
  }

  render() {
    const { promptSymbol, value, onChange, onSubmit, onKeyDown, disabled } = this.props;

    return (
      <div className={'terminalInput'}>
        <StyledForm
          onKeyDown={onKeyDown}
          onSubmit={e => {
            e.preventDefault();
            onSubmit(this.input.value);
            this.input.value = '';
          }}
        >
          <PromptSymbol>{promptSymbol}</PromptSymbol>
          <StyledInput
            disabled={disabled}
            onChange={e => {
              e.persist();
              onChange(e);
            }}
            value={value}
            ref={(inputRef: any) => (this.input = inputRef)}
          />
        </StyledForm>
      </div>
    );
  }
}
export default CommandInput;
