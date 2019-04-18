import { GET_ALL_PLAYERS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PLAYERS:
      return {
        ...state,
        players: action.payload.map(player => {
          return {
            key: player.personId,
            text: player.firstName + " " + player.lastName,
            value: player.personId
          };
        })
      };
    default:
      return state;
  }
}
