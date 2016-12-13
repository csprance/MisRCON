/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description:
 */
export default function JSONifyWhiteList(res) {
  return res
    .replace('-----------------------------------------', '')
    .replace('-----------------------------------------', '')
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace('Whitelisted players : ', '')
    .split(' ')
    .filter((x) => x !== "SteamID:")
    .filter((x) => x !== "0")
    .filter((x) => x !== "");
}
