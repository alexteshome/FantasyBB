import { GET_ERRORS, GET_ALL_PLAYERS } from "./types";
import NBA from "nba";

const fetchPlayers = async () => {
  //convert country to country code for api url
  const players_api_call = await NBA.stats.playerStats();

  return players_api_call;
};

//Asynchronous action creators, dispatches to reducer and is stored depending on action type
export const getPlayers = () => dispatch => {
  fetchPlayers()
    .then(res => {
      console.log(res.leagueDashPlayerStats);
      dispatch({
        type: GET_ALL_PLAYERS,
        payload: res.leagueDashPlayerStats
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
