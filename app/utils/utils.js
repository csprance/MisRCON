/**
 * Name: utils
 * Created by chris on 5/5/2017.
 * Description:
 */
import { shell } from 'electron';

export const handleClick = (link) => {
  shell.openExternal(link);
};
