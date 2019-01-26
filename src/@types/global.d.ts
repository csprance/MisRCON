interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  wcs: any;
}
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;