import { History, OutputFactory, Outputs } from 'async-javascript-terminal';
import { OutputRecordType } from 'async-javascript-terminal/src/types';

import * as React from 'react';
import * as npmPackage from '../../../package.json';

export const makeDefaultHistory = () => History.create([
  'help'
]);
export const makeDefaultOutputs = (
): OutputRecordType => {
  return Outputs.create([
    OutputFactory.makeTextOutput(`MisRCON - V${npmPackage.version}`),
    OutputFactory.makeTextOutput(
      <span>
        Type any rcon command or <span style={{ color: 'orange' }}>help</span>{' '}
        for more options
      </span>
    ),
    OutputFactory.makeTextOutput('-----')
  ]);
};
