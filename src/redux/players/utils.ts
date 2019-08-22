import axios from 'axios';

export const getSteamAvatar = async (steam: string): Promise<string> => {
  const defaultAvatarUrl = 'http://placehold.it/32x32';
  const { data } = await axios.get(
    'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',
    {
      params: {
        key: process.env.STEAM_API_KEY,
        steamids: steam
      }
    }
  );
  if (data.response.players[0]) {
    return data.response.players[0].avatarfull;
  }
  return defaultAvatarUrl;
};
