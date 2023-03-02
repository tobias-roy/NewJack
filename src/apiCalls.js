import axios from "axios";

export async function getGameData() {
  axios
    .get("http://localhost:3000/gamedata")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function updateWon() {
  axios
    .post("http://localhost:3000/updatewon")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function updateDraw() {
  axios
    .post("http://localhost:3000/updatedraw")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function updateHouseWon() {
  axios
    .post("http://localhost:3000/updatehousewon")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
