import { GET_ERRORS, GET_ALL_PLAYERS } from "./types";
import NBA from "nba";

const fetchPlayers = async () => {
  //convert country to country code for api url
  const players_api_call = await fetch("/api/playerStats");
  const playerStats = await players_api_call.json();

  console.log(playerStats);
  return playerStats.data;
};

//Asynchronous action creators, dispatches to reducer and is stored depending on action type
export const getPlayers = () => dispatch => {
  fetchPlayers()
    .then(res => {
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
