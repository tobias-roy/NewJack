<script>
  import {
    dealCard,
    housePoints,
    shuffleCards,
    startedGame,
    userPoints
  } from "../stores";
  import Card from "./Card.svelte";
  import HandEndScreen from "./HandEndScreen.svelte";
  import PopUp from "./PopUp.svelte";
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
  let gameEndStatus = "";
  let lost = false;
  let won = false;
  let draw = false;
  let playerBlackJack = false;
  let allInCheck = false;
  $shuffleCards = false;

  //Creates a deck consisting of 108 cards.
  function createDeck() {
    if (deck.length < 50) {
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
      $shuffleCards = true;
    }
    createdDeck = true;
  }

  function allIn(){
    allInCheck = false;
    betValue = $userPoints;
    $userPoints -= $userPoints;
    startGame();
  }

  function startGame() {
    $startedGame = true;
    if (deck.length < 50) {
      deck = [];
      createDeck();
    }
    dealCards();
  }

  //Resets the entire game.
  export function resetApplication() {
    deck = [];
    houseHand = [];
    houseHandValue = 0;
    playerHand = [];
    playerHandValue = 0;
    stand = false;
    revealHand = false;
    lost = false;
    gameEndStatus = "";
    won = false;
    draw = false;
    playerBlackJack = false;
    $dealCard = false;
  }

  //Clears the hand and the truthy values in the game.
  function clearHands() {
    houseHand = [];
    houseHandValue = 0;
    playerHand = [];
    playerHandValue = 0;
    stand = false;
    revealHand = false;
    lost = false;
    gameEndStatus = "";
    won = false;
    draw = false;
    playerBlackJack = false;
    betValue = 0;
  }

  //Picks a random card and removes it from the deck.
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

  //Checks the value of the hand if an ace is 11.
  function valueOfHandHighAce(handArray) {
    let value = 0;
    handArray.forEach((card) => {
      let cardValue = card.replace(/[^0-9]+/, "");
      value += Number(cardValue);
    });
    return value;
  }

  //Checks the value of the hand.
  function handValue(handArray) {
    let value = 0;
    handArray.forEach((card) => {
      let cardValue = card.replace(/[^0-9]+/, "");
      if (cardValue == 11) {
        if (valueOfHandHighAce(handArray) > 21) {
          cardValue = 1;
        }
      }
      value += Number(cardValue);
    });
    return value;
  }

  //Deals cards to AI and user.
  function dealCards() {
    console.log("dealcardsfunc");
    for (let index = 0; index < 2; index++) {
      let rndcard = pickRandomCard();
      houseHand.push(rndcard);
      houseHand = houseHand;
    }
    houseHandValue = handValue(houseHand);
    playerHand.push(pickRandomCard());
    playerHand.push(pickRandomCard());
    playerHand = playerHand;
    playerHandValue = handValue(playerHand);
    if (playerHandValue == 21) {
      playerBlackJack = true;
      triggerStandAction();
    }
  }

  //Handles a player hit.
  function triggerHitAction() {
    playerHand.push(pickRandomCard());
    playerHand = playerHand;
    playerHandValue = handValue(playerHand);
    if (playerHandValue > 21) {
      revealHand = true;
      lost = true;
      gameEndStatus = "lost";
      setScores();
    } else if (playerHandValue == 21) {
      playerBlackJack = true;
      triggerStandAction();
    }
  }

  //Handles a player stand.
  async function triggerStandAction() {
    stand = true;
    await startHouseActions();
    setScores();
  }

  //Starts the house actions.
  async function startHouseActions() {
    return new Promise((resolve) => {
      setTimeout(async () => {
        revealHand = true;
        await doHouseAI();
        resolve();
      }, 200);
    });
  }

  //Handles values of the house hand.
  async function doHouseAI() {
    let shouldHaveMinimum17 = houseHandValue < 17;
    if (houseHandValue > playerHandValue && houseHandValue < 22) {
      lost = true;
      gameEndStatus = "lost";
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
      console.log('doHouseAI - before checkResult')
      checkResult();
    }
  }

  //Checks
  function checkResult() {
    let sameHand = playerHandValue == houseHandValue; //Draw
    let is17 = houseHandValue == 17; //Compare hands and stop house counting
    let blackjack = houseHandValue == 21; //Compare hands and stop house counting
    let over21 = houseHandValue > 21; //House looses

    if (sameHand) {
      draw = true;
      gameEndStatus = "draw";
    } else if (is17 || blackjack) {
      compareHands();
    } else if (over21 || (playerBlackJack && houseHandValue < 21)) {
      won = true;
      gameEndStatus = "won";
    } else {
      compareHands();
    }

    function compareHands() {
      if (houseHandValue > playerHandValue) {
        lost = true;
        gameEndStatus = "lost";
      } else {
        won = true;
        gameEndStatus = "won";
      }
    }
  }

  //Updates the scores and betvalue.
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

  function clearBet() {
    $userPoints += betValue;
    betValue = 0;
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
  <div class="betMenuButtons">
    <button class="btnStartGame retroFormat blue" on:click={startGame}
      >Deal cards</button
    >
    <button class="btnClearBet retroFormat red" on:click={clearBet}
      >Clear bet</button
    >
    <button class="btnAllIn retroFormat hit" on:click={() => {allInCheck = true}}
      >All in!</button
    >
  </div>
  {/if}

  {#if allInCheck}
      <div class="popUpComponent">
        <PopUp message="Are you sure?" buttonText='ALL IN!' on:buttonClick={allIn}/>
      </div>
  {/if}

  <!-- Show menu if you lost the hand -->
  {#if lost || won || draw}
    <div class="popUpComponent">
      <HandEndScreen gameStatus={gameEndStatus} on:startNewHand={clearHands} />
    </div>
  {/if}

  <!-- Show house hands -->
  <div class="houseHandCards">
    {#if houseHand.length > 0 && $dealCard && !revealHand}
      <Card card={"rear"} direction={200} />
      <Card card={houseHand[1]} direction={200} />
    {:else if houseHand.length > 0 && $dealCard && revealHand}
      {#each houseHand as card}
        <Card {card} direction="200" />
      {/each}
      <div class="houseHandValueContainer">
        <h2 class="houseHandValue">
          House hand: {houseHandValue}
        </h2>
      </div>
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
      <div class="playerHandValueContainer">
        <h2 class="playerHandValue">Hand value: {playerHandValue}</h2>
      </div>
    {/if}
  </div>

  <!-- Display buttons for player actions -->
  {#if $dealCard == true && $startedGame && !lost && !won && !draw}
    <div class="actionButtons">
      {#if !stand}
        <button class="btnAction hit retroFormat" on:click={triggerHitAction}>Hit</button>
      {/if}
      <button class="btnAction stand retroFormat" on:click={triggerStandAction}>stand</button>
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

    .retroFormat.hit{
      background: rgb(23, 206, 23);
    }

    .retroFormat.hit:hover,
    .retroFormat.hit:focus{
      background: rgb(121, 197, 121);
    }
    .retroFormat.stand{
      background: rgb(206, 115, 23);
    }

    .retroFormat.stand:hover,
    .retroFormat.stand:focus{
      background: rgb(203, 131, 60);
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
      margin-left: 100px;
    }

    .houseHandValueContainer {
      width: 150px;
      position: absolute;
      top: 105px;
      left: 20px;
      color: white;
    }
    .actionButtons {
      display: flex;
      position: absolute;
      left: 420px;
      bottom: 100px;
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

    .playerHandValueContainer{
      position: absolute;
      width: 150px;
      bottom: -50px;
      left: 25px;
      color: white;

    }
    .tableBackground {
      background-image: url("../lib/images/table.png");
      background-repeat: no-repeat;
      background-size: contain;
      width: 100%;
      height: 748px;
      position: relative;
    }

    .betMenuButtons{
      position: absolute;
      width: 330px;
      height: 150px;
      left: 500px;
      bottom: 257px;
      z-index: 1;
    }

    .btnStartGame {
      z-index: 1;
      position: absolute;
      left: 0px;
      top: 5px;
    }
    .btnClearBet {
      position: absolute;
      right: 5px;
      top: 5px;
    }

    .btnAllIn {
      position: absolute;
      left: calc(50% - 50px);
      bottom: 15px;
    }


    .userInfo {
      position: absolute;
      bottom: 30px;
      left: 550px;
      font-size: 25px;
      color: white;
    }

    .userInfo > p {
      margin: 0%;
    }

    .shuffleAnimation {
      position: absolute;
      left: calc(50% - 40px);
      bottom: 50%;
      z-index: 0;
    }

    .popUpComponent {
      z-index: 1;
      width: 300px;
      height: 180px;
      flex-direction: column;
      background-color: rgba(199, 172, 232, 0.922);
      position: absolute;
      left: 510px;
      bottom: 330px;
      border-radius: 20px;
    }

    .cardsInDeck {
      position: absolute;
      right: 220px;
      top: 28px;
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
  
  @media only screen and (max-width: 1360px) {
    .tableBackground {
      background-image: url("../lib/images/table.png");
      background-repeat: no-repeat;
      background-size: contain;
      width: 900px;
      height: 550px;
      position: absolute;
      left: calc(50% - 450px);
    }

    .retroFormat {
      margin-top: 20px;
      background: #7c7c7c;
      border-bottom: 3px inset rgba(0, 0, 0, 0.5);
      border-left: 3px inset rgba(0, 0, 0, 0.5);
      border-right: 3px inset rgba(255, 255, 255, 0.5);
      border-top: 3px inset rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-size: 0.6rem;
      min-width: 50px;
      padding: 0.15rem;
      text-transform: uppercase;
      width: auto;
    }
    .retroFormat.hit{
      background: rgb(23, 206, 23);
    }
    .retroFormat.hit:hover,
    .retroFormat.hit:focus{
      background: rgb(121, 197, 121);
    }

    .retroFormat.stand{
      background: rgb(206, 115, 23);
    }
    .retroFormat.stand:hover,
    .retroFormat.stand:focus{
      background: rgb(203, 131, 60);
    }
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
      width: 50px;
      height: 50px;
      color: aliceblue;
      font-size: 13px;
    }

    .chipContainer {
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 26%;
      left: 36%;
    }

    .displayBetValue {
      position: absolute;
      left: 25%;
      bottom: 50%;
      color: rgb(255, 255, 255);
      font-size: 80%;
    }
    .btnAction {
      margin-left: 50px;
    }

    .houseHandValueContainer {
      width: 150px;
      position: absolute;
      top: 75px;
      left: 20px;
      color: white;
    }

    .houseHandValue{
      font-size: 12px;
    }

    .actionButtons {
      display: flex;
      position: absolute;
      left: 325px;
      bottom: 105px;
    }
    .houseHandCards {
      display: flex;
      position: absolute;
      left: calc(50% - 62px);
      bottom: 75%;
    }

    .playerHandCards {
      display: flex;
      position: absolute;
      left: calc(50% - 62px);
      bottom: 28%;
    }

    .playerHandValue{
      font-size: 12px;
    }
    .playerHandValueContainer{
      position: absolute;
      width: 100px;
      bottom: -25px;
      left: 23px;
      color: white;
    }

    .betMenuButtons{
      position: absolute;
      width: 155px;
      height: 100px;
      left: calc(50% - 80px);
      bottom: 200px;
      z-index: 1;
    }

    .btnStartGame {
      z-index: 1;
      position: absolute;
      left: 0px;
      top: 5px;
    }
    .btnClearBet {
      position: absolute;
      right: 5px;
      top: 5px;
    }

    .btnAllIn {
      position: absolute;
      left: calc(50% - 25px);
      bottom: 15px;
    }

    .userInfo {
      position: absolute;
      bottom: 12%;
      left: calc(50% - 57px);
      font-size: 12px;
      color: white;
    }

    .shuffleAnimation {
      position: absolute;
      left: calc(50% - 31px);
      bottom: 53%;
      z-index: 0;
    }

    .popUpComponent {
      z-index: 1;
      width: 150px;
      height: 90px;
      flex-direction: column;
      background-color: rgba(199, 172, 232, 0.922);
      position: absolute;
      left: calc(50% - 75px);
      bottom: 286px;
      border-radius: 5px;
    }

    .cardsInDeck {
      position: absolute;
      right: 170px;
      top: 28px;
      color: white;
      font-size: 12px;
    }

    .housePoints {
      position: absolute;
      left: 10%;
      top: 5%;
      color: white;
      font-size: 12px;
    }
  }
</style>
