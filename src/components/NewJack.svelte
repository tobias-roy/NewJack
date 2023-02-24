<script>
  import gametable from "../lib/images/table.png";
  import { housePoints, name, shuffleCards, userPoints } from "../stores";
  import Card from "./Card.svelte";
  import Shuffle from "./Shuffle.svelte";

  const cardType = ['club', 'diamond', 'heart', 'spade'];
  const cardValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
  let deck = [];
  let randomCard;
  let createdDeck = false;
  $shuffleCards = false;

  function createDeck () {
    cardType.forEach(type => {
      cardValue.forEach(value => {
        let card = {
          type: type,
          value: value
        }
        deck.push(card);
      });
    });
    createdDeck = true;
    $shuffleCards = true;
  }

  function pickRandomCard () {
    let pickedCard;
    if(deck.length > 0){
      let random = Math.floor(Math.random() * deck.length);
      pickedCard = deck[random];
      randomCard = pickedCard.type + pickedCard.value;
    } 
  }
</script>

<div class="tableBackground">
	<p>Hello {$name}. Points: {$userPoints}</p>
  <p>House points: {$housePoints}</p>
  <button on:click={createDeck}>Press to create a deck</button>
  <Card card="{randomCard}"/>
  {#if createdDeck === true}
    <Shuffle />
  {/if}
</div>

<style>
.tableBackground {
  background-image: url("../lib/images/table.png");
  background-repeat:no-repeat;
  background-size: contain;
  width: 100%;
  height: 80vh;
}
</style>
