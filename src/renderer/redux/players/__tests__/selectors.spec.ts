import { activeServer0 } from '../../servers/__tests__/state-mocks';
import { playersSelectors } from '../index';
import {
  activePlayer1,
  activePlayer2,
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
    ).toEqual([activePlayer1, activePlayer2, activePlayerOnDifferentServer]);
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
        playersSelectors.inActivePlayersSelector.resultFunc(
          listOfPlayersOnSameServer
        ),
        activeServer0
      )
    ).toEqual([inActivePlayer, inActivePlayer]);
  });

  it('Should selective active players on active server', () => {
    expect(
      playersSelectors.activePlayersOnActiveServerSelector.resultFunc(
        playersSelectors.activePlayersSelector.resultFunc(
          listOfPlayersOnSameServer
        ),
        activeServer0
      )
    ).toEqual([activePlayer1, activePlayer2]);
  });

  it('should select a player by ID', () => {
    const player1 = playersSelectors
      .makePlayerByPartialSelector({ id: activePlayer1.id })
      .resultFunc(listOfPlayersOnSameServer);
    const player2 = playersSelectors
      .makePlayerByPartialSelector({ id: activePlayer2.id })
      .resultFunc(listOfPlayersOnSameServer);
    expect(player1).toEqual(activePlayer1);
    expect(player2).toEqual(activePlayer2);
  });
});
