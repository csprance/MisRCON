import { shell } from 'electron';

export const openExternally = (link: string) => {
  shell.openExternal(link);
};

export const zip = (a: any[], b: any[]) => a.map((e, i) => [e, b[i]]);
