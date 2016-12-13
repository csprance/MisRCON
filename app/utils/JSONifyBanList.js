/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description:
 */
export default function JSONifyBanList(res) {
  return res
    .replace('-----------------------------------------', '')
    .replace('-----------------------------------------', '')
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace('Banned players : ', '')
    .split(' ')
    .filter((x) => x !== "SteamID:")
    .filter((x) => x !== "");
}
