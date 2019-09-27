import { IPlayer, SteamID } from 'node-misrcon';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { addPingMetric } from '../ping/actions';

import { sendRCONAsyncThunk } from '../rcon/actions';
import { makeRequestObjectForActiveServer } from '../rcon/utils';
import { AsyncThunkResult } from '../redux-types';
import {
  getBanlistStatusThunk,
  getWhitelistStatusThunk
} from '../servers/actions';
import {
  activeServerIDSelector,
  activeServerSelector
} from '../servers/selectors';
import { playersSelector } from './selectors';
import { defaultPlayer } from './state';
import { Player } from './types';
import { getPlayerLocationByIp, getSteamAvatar } from './utils';

export const syncPlayerWhitelist = createAsyncAction(
  'players/SYNC_PLAYER_WHITELIST_REQUEST',
  'players/SYNC_PLAYER_WHITELIST_SUCCESS',
  'players/SYNC_PLAYER_WHITELIST_FAILED'
)<void, void, string>();
export const syncPlayerWhitelistThunk = (
  steamID: string,
  serverID: number
): AsyncThunkResult<void> => async (dispatch, getState) => {
  dispatch(syncPlayerWhitelist.request());
  try {
    const storePlayers: Player[] = playersSelector(getState());
    const storedPlayer = storePlayers.find(pl => pl.steam === steamID);

    if (storedPlayer) {
      dispatch(addWhitelistStatusToPlayers([steamID], serverID));
    } else {
      await dispatch(
        syncPlayerThunk(
          {
            ...defaultPlayer,
            id: Date.now(),
            steam: steamID,
            name: steamID,
            ip: '0.0.0.0'
          },
          false,
          false
        )
      );
      await dispatch(addWhitelistStatusToPlayers([steamID], serverID));
    }
    dispatch(syncPlayerWhitelist.success());
  } catch (err) {
    dispatch(syncPlayerWhitelist.failure(err.toString()));
  }
};

export const syncPlayerBanlist = createAsyncAction(
  'players/SYNC_PLAYER_BANLIST_REQUEST',
  'players/SYNC_PLAYER_BANLIST_SUCCESS',
  'players/SYNC_PLAYER_BANLIST_FAILED'
)<void, void, string>();
export const syncPlayerBanlistThunk = (
  steamID: string,
  serverID: number
): AsyncThunkResult<void> => async (dispatch, getState) => {
  dispatch(syncPlayerBanlist.request());
  try {
    const storePlayers: Player[] = playersSelector(getState());
    const storedPlayer = storePlayers.find(pl => pl.steam === steamID);

    if (storedPlayer) {
      dispatch(addBanlistStatusToPlayers([steamID], serverID));
    } else {
      await dispatch(
        syncPlayerThunk(
          {
            ...defaultPlayer,
            id: Date.now(),
            steam: steamID,
            name: steamID,
            ip: '0.0.0.0'
          },
          false,
          false
        )
      );
      await dispatch(addBanlistStatusToPlayers([steamID], serverID));
    }
    dispatch(syncPlayerBanlist.success());
  } catch (err) {
    dispatch(syncPlayerBanlist.failure(err.toString()));
  }
};

export const syncPlayer = createAsyncAction(
  'players/SYNC_PLAYER_REQUEST',
  'players/SYNC_PLAYER_SUCCESS',
  'players/SYNC_PLAYER_FAILED'
)<undefined, Player, string>();
export const syncPlayerThunk = (
  player: IPlayer,
  markActive = true,
  recordPing = true
): AsyncThunkResult<void> => async (dispatch, getState) => {
  dispatch(syncPlayer.request());
  try {
    const storePlayers: Player[] = playersSelector(getState());
    const storedPlayer = storePlayers.find(pl => pl.steam === player.steam);
    const activeServerID = activeServerSelector(getState()).id;
    // Add ping Data about the player
    if (recordPing) {
      dispatch(
        addPingMetric({
          serverID: activeServerID,
          playerID: player.steam,
          ping: player.ping,
          date: Date.now()
        })
      );
    }
    // If the player is stored update it's data
    if (storedPlayer) {
      dispatch(
        syncPlayer.success({
          ...storedPlayer,
          ...player,
          active: markActive,
          location:
            storedPlayer.location === 'xx'
              ? await getPlayerLocationByIp(player.ip)
              : storedPlayer.location,
          serverID: activeServerID,
          seenOn: [
            ...storedPlayer.seenOn.filter(id => id !== activeServerID),
            activeServerID
          ]
        })
      );
      return;
    }
    // If the player is not stored create new data
    const location = await getPlayerLocationByIp(player.ip);
    const avatarUrl = await getSteamAvatar(player.steam);
    const syncedPlayer: Player = {
      ...player,
      avatarUrl,
      active: markActive,
      serverID: activeServerID,
      color: '#fff',
      notes: '',
      banned: [],
      whitelisted: [],
      seenOn: [activeServerID],
      location
    };
    dispatch(syncPlayer.success(syncedPlayer));
  } catch (err) {
    dispatch(syncPlayer.failure(err.toString()));
  }
};

/*
 * * Kick a SteamID on the active server
 */
export const kickSteamID = createAsyncAction(
  'players/KICK_REQUEST',
  'players/KICK_SUCCESS',
  'players/KICK_FAILED'
)<undefined, undefined, string>();
export const kickSteamIDThunk = (
  steam: SteamID
): AsyncThunkResult<any> => async (dispatch, getState) => {
  dispatch(kickSteamID.request());
  try {
    const request = makeRequestObjectForActiveServer(
      getState,
      `mis_kick ${steam}`
    );

    await dispatch(sendRCONAsyncThunk(request));
    dispatch(kickSteamID.success());
  } catch (err) {
    dispatch(kickSteamID.failure(err.toString()));
  }
};

/*
 * * Ban a SteamID on the active server
 */
export const banSteamID = createAsyncAction(
  'players/BAN_STEAMID_REQUEST',
  'players/BAN_STEAMID_SUCCESS',
  'players/BAN_STEAMID_FAILED'
)<undefined, undefined, string>();
export const banSteamIDThunk = (
  steamid: string
): AsyncThunkResult<any> => async (dispatch, getState) => {
  dispatch(banSteamID.request());
  try {
    const request = makeRequestObjectForActiveServer(
      getState,
      `mis_ban_steamid ${steamid}`
    );
    const response = await dispatch(sendRCONAsyncThunk(request));

    if (response.completed) {
      dispatch(banSteamID.success());
      dispatch(getBanlistStatusThunk());
    } else {
      dispatch(banSteamID.failure('REQUEST FAILED'));
    }
  } catch (err) {
    dispatch(banSteamID.failure(err.toString()));
  }
};

/*
 * * Whitelist a SteamID on the active server
 */
export const whitelistSteamID = createAsyncAction(
  'players/WHITELIST_ADD_REQUEST',
  'players/WHITELIST_ADD_SUCCESS',
  'players/WHITELIST_ADD_FAILED'
)<undefined, number, string>();
export const whitelistSteamIDThunk = (
  steamid: SteamID
): AsyncThunkResult<any> => async (dispatch, getState) => {
  dispatch(whitelistSteamID.request());
  try {
    const request = makeRequestObjectForActiveServer(
      getState,
      `mis_whitelist_add ${steamid}`
    );
    const response = await dispatch(sendRCONAsyncThunk(request));

    if (response.completed) {
      dispatch(whitelistSteamID.success(activeServerIDSelector(getState())));
      dispatch(getWhitelistStatusThunk());
    } else {
      dispatch(whitelistSteamID.failure('REQUEST FAILED'));
    }
  } catch (err) {
    dispatch(whitelistSteamID.failure(err.toString()));
  }
};

/*
 * * Remove a ban from a SteamID on the active server
 */
export const removeBanSteamID = createAsyncAction(
  'players/REMOVE_BAN_STEAMID_REQUEST',
  'players/REMOVE_BAN_STEAMID_SUCCESS',
  'players/REMOVE_BAN_STEAMID_FAILED'
)<undefined, undefined, string>();
export const removeBanSteamIDThunk = (
  steamid: string
): AsyncThunkResult<any> => async (dispatch, getState) => {
  dispatch(removeBanSteamID.request());
  try {
    const request = makeRequestObjectForActiveServer(
      getState,
      `mis_ban_remove ${steamid}`
    );
    const response = await dispatch(sendRCONAsyncThunk(request));

    if (response.completed) {
      dispatch(removeBanSteamID.success());
      dispatch(getBanlistStatusThunk());
    } else {
      dispatch(removeBanSteamID.failure('REQUEST FAILED'));
    }
  } catch (err) {
    dispatch(removeBanSteamID.failure(err.toString()));
  }
};

/*
 * * Remove a SteamID from a the whitelist of the active server
 */
export const removeWhitelistSteamID = createAsyncAction(
  'players/REMOVE_WHITELIST_ADD_REQUEST',
  'players/REMOVE_WHITELIST_ADD_SUCCESS',
  'players/REMOVE_WHITELIST_ADD_FAILED'
)<undefined, number, string>();
export const removeWhitelistSteamIDThunk = (
  steamid: SteamID
): AsyncThunkResult<any> => async (dispatch, getState) => {
  dispatch(removeWhitelistSteamID.request());
  try {
    const request = makeRequestObjectForActiveServer(
      getState,
      `mis_whitelist_remove ${steamid}`
    );
    const response = await dispatch(sendRCONAsyncThunk(request));

    if (response.completed) {
      await dispatch(sendRCONAsyncThunk(request));
      dispatch(
        removeWhitelistSteamID.success(activeServerIDSelector(getState()))
      );
      dispatch(getWhitelistStatusThunk());
    } else {
      dispatch(removeWhitelistSteamID.failure('REQUEST FAILED'));
    }
  } catch (err) {
    dispatch(removeWhitelistSteamID.failure(err.toString()));
  }
};

export const setPlayerNote = createAction(
  'players/SET_NOTE',
  resolve => (steam: string, notes: string) => resolve({ steam, notes })
);

export const setPlayerColor = createAction(
  'players/SET_COLOR',
  resolve => (steam: string, color: string) => resolve({ steam, color })
);

export const markAllPlayersInactive = createAction(
  'players/MARK_ALL_PLAYERS_INACTIVE'
);

export const deleteAllPlayers = createAction('players/DELETE_ALL_PLAYERS');

export const addWhitelistStatusToPlayers = createAction(
  'players/ADD_WHITELIST_STATUS_TO_PLAYERS',
  resolve => (steamids: string[], serverId: number) =>
    resolve({ steamids, serverId })
);

export const addBanlistStatusToPlayers = createAction(
  'players/ADD_BANLIST_STATUS_TO_PLAYERS',
  resolve => (steamids: string[], serverId: number) =>
    resolve({ steamids, serverId })
);

export const clearWhitelistForServerByID = createAction(
  'players/CLEAR_WHITELIST_BY_SERVER_ID',
  resolve => (serverId: number) => resolve({ serverId })
);

export const clearBanlistForServerByID = createAction(
  'players/CLEAR_BANLIST_BY_SERVER_ID',
  resolve => (serverId: number) => resolve({ serverId })
);
