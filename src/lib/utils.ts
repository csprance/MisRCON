import { shell } from 'electron';

export const openExternally = (link: string) => {
  shell.openExternal(link);
};