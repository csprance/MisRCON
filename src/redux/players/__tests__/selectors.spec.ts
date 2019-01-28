import { activeServer0 } from '../../servers/__tests__/state-mocks';
import { playersSelectors } from '../index';
import {
  activePlayer,
  activePlayerOnDifferentServer,
  inActivePlayer,
  inActivePlayerOnDifferentServer,
  listOfPlayersOnSameServer
} from './state-mocks';

describe('Players Selectors', () => {
  it('should select all active players', () => {
    expect(
      playersSelectors.activePlayersSelector.resultFunc(
        listOfPlayersOnSameServer
      )
    ).toEqual([activePlayer, activePlayer, activePlayerOnDifferentServer]);
  });

  it('should select all inActive players', () => {
    expect(
      playersSelectors.inActivePlayersSelector.resultFunc(
        listOfPlayersOnSameServer
      )
    ).toEqual([
      inActivePlayer,
      inActivePlayer,
      inActivePlayerOnDifferentServer
    ]);
  });

  it('Should selective inactive players on active server', () => {
    expect(
      playersSelectors.inactivePlayersOnActiveServerSelector.resultFunc(
        playersSelectors.inActivePlayersSelector(listOfPlayersOnSameServer),
        activeServer0
      )
    ).toEqual([inActivePlayer, inActivePlayer]);
  });

  it('Should selective active players on active server', () => {
    expect(
      playersSelectors.activePlayersOnActiveServerSelector.resultFunc(
        playersSelectors.activePlayersSelector(listOfPlayersOnSameServer),
        activeServer0
      )
    ).toEqual([activePlayer, activePlayer]);
  });
});
