import * as React from 'react';

export default (Component: any) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Component />
    </div>
  );
};
