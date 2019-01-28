import * as React from 'react';

import ExternalLink from './ExternalLink';

type Props = {
  steam: number;
};
const SteamRepLink: React.FunctionComponent<Props> = ({ steam, children }) => {
  return (
    <ExternalLink href={`https://steamrep.com/search?q=${steam}`}>
      {children}
    </ExternalLink>
  );
};

export default SteamRepLink;
