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

export const getPlayerLocationByIp = async (ip: string): Promise<string> => {
  const { data } = await axios.get(`https://freegeoip.app/json/${ip}`);
  return data.country_code !== '' ? data.country_code : 'xx';
};
