import axios from 'axios';

export const getSteamAvatar = async (steam: string): Promise<string> => {
  const defaultAvatar = '../src/resources/images/defaultAvatar.png';
  try {
    const { data } = await axios.get('https://a.entradainteractive.com', {
      params: {
        steamid: steam
      }
    });

    return data;
  } catch (e) {
    return defaultAvatar;
  }
};
