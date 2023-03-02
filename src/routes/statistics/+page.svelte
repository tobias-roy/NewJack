<script>
  import axios from "axios";
  import { onMount } from "svelte";
  let gameData = {};

  function getGameData() {
    axios
      .get("http://localhost:3000/gamedata")
      .then(function (response) {
        gameData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onMount(async () => {
    getGameData();
  });
</script>

<div class="centerDiv">
  <ul>
    <li>User won: {gameData.won}</li>
    <li>House won: {gameData.houseWon}</li>
    <li>Total games: {gameData.totalgames}</li>
    <li>Draw games: {gameData.draw}</li>
  </ul>
</div>

<style>
  .centerDiv {
    position: absolute;
    width: fit-content;
    left: calc(50% - 77px);
  }
</style>
