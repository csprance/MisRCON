import { shell } from 'electron';

export const openExternally = (link: string) => {
  shell.openExternal(link);
};

/*
Mimics python ZIP Function
[1,2,3] [a,b,c] => [[1,a], [2,b], [3,c]]
 */
export const zip = (a: any[], b: any[]) =>
  a.map((elem, index) => [elem, b[index]]);

// tslint:disable-next-line:no-empty
export const noop = () => {};
