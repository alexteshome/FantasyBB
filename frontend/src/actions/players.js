import { GET_ERRORS, GET_ALL_PLAYERS } from "./types";

const fetchPlayers = async () => {
  //convert country to country code for api url
  const players_api_call = await fetch(
    `https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2018/players.json`
  );

  return players_api_call.json();
};

//Asynchronous action creators, dispatches to reducer and is stored depending on action type
export const getPlayers = () => dispatch => {
  fetchPlayers()
    .then(res => {
      dispatch({
        type: GET_ALL_PLAYERS,
        payload: res["league"]["standard"]
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
