/*
HOC to wrap a component in a material theme provider
 */
import { MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../../styles/theme';

interface Props {}
export const withMaterialTheme = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & Props> => ({ ...props }: Props) => (
  <MuiThemeProvider theme={theme}>
    <Component {...props as P} />
  </MuiThemeProvider>
);
