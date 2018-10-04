import * as React from 'react';

let uniqueKey = 0; // unique number for an output given an instance of emulator

type Props = {
  outputRenderers: any;
  outputs: any;
  [key: string]: any;
};
const OutputList = ({
  outputRenderers,
  outputs,
  ...outputRendererProps
}: Props) => (
  <div className={'terminalOutput'}>
    {outputs.map((output: any) => {
      const type = output.get('type');
      const content = output.get('content');

      if (!outputRenderers.hasOwnProperty(type)) {
        throw new Error(
          `No output renderer set for ${type} in outputRenderers`
        );
      }

      const OutputComponent = outputRenderers[type];

      return (
        <OutputComponent
          key={uniqueKey++}
          {...outputRendererProps}
          content={content}
        />
      );
    })}
  </div>
);

export default OutputList;
