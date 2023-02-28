<script>
  import rear from "$lib/svg/cards/rear.svg";
  import { bubble } from "svelte/internal";
  import gametable from "../lib/images/table.png";
  import {
    dealCard,
    housePoints,
    name,
    shuffleCards, startedGame, userPoints
  } from "../stores";
  import Card from "./Card.svelte";
  import HandEndScreen from "./HandEndScreen.svelte";
  import Shuffle from "./Shuffle.svelte";

  const cardType = ["club", "diamond", "heart", "spade"];
  const cardValue = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    "Jack10",
    "Queen10",
    "King10",
    "Ace11",
  ];
  let deck = [];
  let houseHand = [];
  let houseHandValue = 0;
  let playerHand = [];
  let playerHandValue = 0;
  let createdDeck = false;
  let betValue = 0;
  let stand = false;
  let revealHand = false;
  let gameEndStatus = '';
  let lost = false;
  let won = false;
  let draw = false;
  let playerBlackJack = false;
  $shuffleCards = false;

  function createDeck() {
    for (let index = 0; index < 2; index++) {
      cardType.forEach((type) => {
        cardValue.forEach((value) => {
          let card = {
            type: type,
            value: value,
          };
          deck.push(card);
          deck = deck;
        });
      });
    }
    createdDeck = true;
    $shuffleCards = true;
  }

  function startGame() {
    if ($startedGame) {
      resetGame();
    }
    $startedGame = true;
    if (deck.length < 50) {
      deck = [];
      createDeck();
    }
    initialDeal();
  }

  export function resetGame() {
    console.log('triggered')
    deck = [];
    houseHand = [];
    houseHandValue = 0;
    playerHand = [];
    playerHandValue = 0;
    stand = false;
    revealHand = false;
    lost = false;
    gameEndStatus = '';
    won = false;
    draw = false;
    playerBlackJack = false;
    $shuffleCards = false;
    $dealCard = false;
    $startedGame = false;
  }

  function pickRandomCard() {
    let pickedCard;
    if (deck.length > 0) {
      let random = Math.floor(Math.random() * deck.length);
      pickedCard = deck[random];
      deck.splice(random, 1);
      pickedCard = pickedCard.type + pickedCard.value;
      deck = deck;
    }
    return pickedCard;
  }

  function valueOfHandAce11(handArray) {
    let value = 0;
    handArray.forEach((card) => {
      let cardValue = card.replace(/[^0-9]+/, "");
      value += Number(cardValue);
    });
    return value;
  }

  function handValue(handArray) {
    let value = 0;
    handArray.forEach((card) => {
      let cardValue = card.replace(/[^0-9]+/, "");
      if (cardValue == 11) {
        if (valueOfHandAce11(handArray) > 21) {
          cardValue = 1;
        }
      }
      value += Number(cardValue);
    });
    return value;
  }

  function initialDeal() {
    for (let index = 0; index < 2; index++) {
      let rndcard = pickRandomCard();
      houseHand.push(rndcard);
      houseHand = houseHand;
    }
    houseHandValue = handValue(houseHand);
    playerHand.push(pickRandomCard());
    playerHand = playerHand;
    playerHandValue = handValue(playerHand);
  }

  async function hitAction() {
    playerHand.push(pickRandomCard());
    playerHand = playerHand;
    playerHandValue = handValue(playerHand);
    if (playerHandValue > 21) {
      lost = true;
      gameEndStatus = 'lost';
      setScores();
    } else if (playerHandValue == 21) {
      playerBlackJack = true;
      await startHouseActions();
      setScores();
    }
  }

  async function triggerStandAction() {
    stand = true;
    await startHouseActions();
    setScores();
  }

  async function startHouseActions() {
    return new Promise((resolve) => {
      setTimeout(async () => {
        revealHand = true;
        await doHouseAI();
        resolve();
      }, 200);
    });
  }

  async function doHouseAI() {
    let shouldHaveMinimum17 = houseHandValue < 17;
    console.log("first", shouldHaveMinimum17);
    if (houseHandValue > playerHandValue && houseHandValue < 22) {
      lost = true;
      gameEndStatus = 'lost';
    } else if (shouldHaveMinimum17) {
      houseHand.push(pickRandomCard());
      houseHand = houseHand;
      houseHandValue = handValue(houseHand);
      return new Promise((resolve) => {
        setTimeout(async () => {
          await doHouseAI();
          resolve();
        }, 200);
      });
    } else {
      checkResult();
      console.log(
        "lost",
        lost,
        "won",
        won,
        "draw",
        draw,
        "playerblackjack",
        playerBlackJack
      );
    }
  }

  function checkResult() {
    let sameHand = playerHandValue == houseHandValue; //Draw
    let is17 = houseHandValue == 17; //Compare hands and stop house counting
    let blackjack = houseHandValue == 21; //Compare hands and stop house counting
    let over21 = houseHandValue > 21; //House looses
    function houseOverPlayer() {
      if (houseHandValue > playerHandValue) {
        lost = true;
      gameEndStatus = 'lost';

      } else {
        won = true;
      gameEndStatus = 'won';

      }
    }
    function playerOverHouse() {
      if (playerHandValue > houseHandValue) {
        won = true;
      gameEndStatus = 'won';

      } else {
        lost = true;
      gameEndStatus = 'lost';

      }
    }

    if (sameHand) {
      draw = true;
      gameEndStatus = 'draw';

    } else if (is17 || blackjack) {
      houseOverPlayer();
      playerOverHouse();
    } else if (over21) {
      won = true;
      gameEndStatus = 'won';

    }
  }

  function setScores() {
    if (lost) {
      $housePoints += betValue;
    } else if (won) {
      $userPoints += betValue * 2;
      $housePoints -= betValue;
    } else if (draw) {
      $userPoints += betValue;
    }
  }

  function raiseBet(amount) {
    //Check to see if the user has new bet amount in his wallet
    if ($userPoints - amount >= 0) {
      betValue += amount;
      betValue = betValue;
      $userPoints -= amount;
    }
  }

  dealCard.subscribe((value) => {
    if (value) {
      pickRandomCard();
    }
  });
</script>

<!-- Game table -->
<div class="tableBackground">
  <div class="cardsInDeck">
    <h3>Cards: {deck.length}</h3>
  </div>
  <div class="housePoints">
    <h3>House balance: {$housePoints}</h3>
  </div>

  <!-- Bet menu -->
  {#if !$startedGame}
    <button class="btnStartGame retroFormat blue" on:click={startGame}
      >Deal cards</button
    >
    <button class="btnClearBet retroFormat red" on:click={() => {betValue = 0}}
      >Clear bet</button
    >
  {/if}

  <!-- Show menu if you lost the hand -->
  {#if lost || won || draw}
    <div class="lostScreen">
      <HandEndScreen gameStatus={gameEndStatus} on:startNewHand={resetGame}/>
    </div>
  {/if}

  <!-- Show house hands -->
  <div class="houseHandCards">
    {#if houseHand.length > 0 && $dealCard && !stand}
      <Card card={"rear"} direction={200} />
      <Card card={houseHand[1]} direction={200} />
    {:else if houseHand.length > 0 && $dealCard && revealHand}
      {#each houseHand as card}
        <Card {card} direction="200" />
      {/each}
      <div class="houseHandValue">House hand: {houseHandValue}</div>
    {/if}
  </div>

  <!-- Show shuffle animation and rear of deck -->
  {#if createdDeck === true}
    <div class="shuffleAnimation">
      <Shuffle />
    </div>
  {/if}

  <!-- Display user hand -->
  <div class="playerHandCards">
    {#if playerHand.length > 0 && $dealCard == true}
      {#each playerHand as card}
        <Card {card} direction={-200} />
      {/each}
    {/if}
  </div>

  <!-- Display buttons for player actions -->
  {#if $dealCard == true && $startedGame && !lost && !won && !draw}
    <div class="actionButtons">
      {#if !stand}
        <button class="btnAction" on:click={hitAction}>Hit</button>
      {/if}
      <button class="btnAction" on:click={triggerStandAction}>stand</button>
    </div>
  {/if}

  {#if !$startedGame}
    <div class="displayBetValue">Bet value: {betValue}</div>
  {/if}

  {#if !$startedGame}
    <div class="chipContainer">
      <button
        class="pokerChip"
        on:click={() => {
          raiseBet(10);
        }}>10</button
      >
      <button
        class="pokerChip"
        on:click={() => {
          raiseBet(20);
        }}>20</button
      >
      <button
        class="pokerChip"
        on:click={() => {
          raiseBet(50);
        }}>50</button
      >
      <button
        class="pokerChip"
        on:click={() => {
          raiseBet(100);
        }}>100</button
      >
      <button
        class="pokerChip"
        on:click={() => {
          raiseBet(200);
        }}>200</button
      >
    </div>
  {/if}

  <!-- Display the users points -->
  <div class="userInfo">
    <p>Your Balance: {$userPoints}</p>
  </div>
</div>

<style>
  @media only screen and (min-width: 1360px) {
    .retroFormat.blue {
      background: #0000bc;
    }
    .retroFormat.blue:focus,
    .retroFormat.blue:hover {
      background: #0000fc;
    }

    .retroFormat.red {
      background: #881400;
    }
    .retroFormat.red:focus,
    .retroFormat.red:hover {
      background: #a81000;
    }

    .retroFormat {
      margin-top: 20px;
      background: #7c7c7c;
      border-bottom: 6px inset rgba(0, 0, 0, 0.5);
      border-left: 6px inset rgba(0, 0, 0, 0.5);
      border-right: 6px inset rgba(255, 255, 255, 0.5);
      border-top: 6px inset rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-size: 1.2rem;
      min-width: 100px;
      padding: 0.3rem;
      text-transform: uppercase;
      width: auto;
    }
    .pokerChip {
      background-image: url(../lib/svg/pokerchip.svg);
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 55px;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      width: 80px;
      height: 80px;
      color: aliceblue;
    }

    .chipContainer {
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 23%;
      left: 35%;
    }

    .displayBetValue {
      position: absolute;
      left: 25%;
      bottom: 50%;
      color: rgba(255, 255, 255, 0.788);
      font-size: 150%;
    }
    .btnAction {
      margin-left: 20px;
    }

    .houseHandValue {
      position: absolute;
      bottom: -25%;
    }
    .actionButtons {
      display: flex;
      position: absolute;
      left: 45%;
      bottom: 15%;
    }
    .houseHandCards {
      display: flex;
      position: absolute;
      left: 44%;
      bottom: 75%;
    }

    .playerHandCards {
      display: flex;
      position: absolute;
      left: 44%;
      bottom: 25%;
    }
    .tableBackground {
      background-image: url("../lib/images/table.png");
      background-repeat: no-repeat;
      background-size: contain;
      width: 100%;
      height: 748px;
      position: relative;
    }

    .btnStartGame {
      z-index: 1;
      position: absolute;
      left: calc(50% - 120px);
      bottom: calc(50% - 9px);
    }
    .btnClearBet {
      position: absolute;
      right: 35%;
      bottom: calc(50% - 9px);
    }

    .userInfo {
      position: absolute;
      bottom: 30px;
      left: calc(50% - 80px);
      font-size: larger;
    }

    .shuffleAnimation {
      position: absolute;
      left: calc(50% - 40px);
      bottom: 50%;
      z-index: 0;
    }

    .lostScreen {
      z-index: 1;
      width: 500px;
      height: 200px;
      flex-direction: column;
      background-color: rgba(255, 255, 255, 0.828);
      position: absolute;
      left: calc(50% - 250px);
      bottom: calc(50% - 60px);
    }

    .cardsInDeck {
      position: absolute;
      right: 5%;
      top: 5%;
      color: white;
      font-size: 25px;
    }

    .housePoints {
      position: absolute;
      left: 5%;
      top: 5%;
      color: white;
      font-size: 25px;
    }
  }
</style>
