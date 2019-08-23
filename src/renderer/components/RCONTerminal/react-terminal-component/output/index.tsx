import { OutputType } from 'async-javascript-terminal';

import HeaderOutput from './HeaderOutput';
import TextErrorOutput from './TextErrorOutput';
import TextOutput from './TextOutput';

export const {
  TEXT_OUTPUT_TYPE,
  TEXT_ERROR_OUTPUT_TYPE,
  HEADER_OUTPUT_TYPE
} = OutputType;

export default {
  [TEXT_OUTPUT_TYPE]: TextOutput,
  [TEXT_ERROR_OUTPUT_TYPE]: TextErrorOutput,
  [HEADER_OUTPUT_TYPE]: HeaderOutput
};
