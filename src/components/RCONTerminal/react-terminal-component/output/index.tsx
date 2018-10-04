import { OutputType } from 'async-javascript-terminal';

import HeaderOutput from './HeaderOutput';
import TextErrorOutput from './TextErrorOutput';
import TextOutput from './TextOutput';

export default {
  [OutputType.TEXT_OUTPUT_TYPE]: TextOutput,
  [OutputType.TEXT_ERROR_OUTPUT_TYPE]: TextErrorOutput,
  [OutputType.HEADER_OUTPUT_TYPE]: HeaderOutput
};
