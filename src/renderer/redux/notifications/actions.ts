import { createAction } from 'typesafe-actions';

export const addInfo = createAction(
  'notifications/ADD_INFO',
  resolve => (content: string) => resolve(content)
);

export const addError = createAction(
  'notifications/ADD_ERROR',
  resolve => (content: string) => resolve(content)
);

export const addSuccess = createAction(
  'notifications/ADD_SUCCESS',
  resolve => (content: string) => resolve(content)
);


export const closeNotification = createAction(
  'notifications/CLOSE',
  resolve => (id: number) => resolve(id)
);
