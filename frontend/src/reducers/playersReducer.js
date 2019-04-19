import { GET_ALL_PLAYERS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PLAYERS:
      return {
        ...state,
        players: action.payload.map(player => {
          return {
            personId: player.personId,
            name: player.firstName + " " + player.lastName,
            position: player.pos
          };
        })
      };
    default:
      return state;
  }
}
