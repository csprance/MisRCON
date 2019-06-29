// Common Redux Selectors shared between other
import { RootState } from './redux-types';

export const propsSelector = (_: RootState, props: any): any => props;

export const rehydratedSelector = (_: RootState, props: any): boolean => {
  if (props._persistor) {
    return props._persistor.rehydrated as boolean;
  }
  return false;
};

export const idPropsSelector = (_: RootState, props: { id: number }): number =>
  props.id;

export const ipPortPropsSelector = (
  _: RootState,
  props: { ip: string; port: number }
): { ip: string; port: number } => props;
