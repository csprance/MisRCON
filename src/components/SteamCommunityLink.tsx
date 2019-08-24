import * as React from 'react';

import ExternalLink from './ExternalLink';

interface Props {
  steam: number;
}
const SteamCommunityLink: React.FunctionComponent<Props> = ({
  steam,
  children
}) => {
  return (
    <ExternalLink href={`https://steamcommunity.com/profiles/${steam}`}>
      {children}
    </ExternalLink>
  );
};

export default SteamCommunityLink;
