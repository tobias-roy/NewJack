<script>
  import { fade } from "svelte/transition";
  import { dealCard, shuffleCards } from "../stores";
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

  function createDeck() {
    cardType.forEach((type) => {
      cardValue.forEach((value) => {
        let card = {
          type: type,
          value: value,
        };
        deck.push(card);
      });
    });
  }

  let visibleCard;
  let i = 0;
  function shuffleCardsFunc() {
    setTimeout(function () {
      visibleCard = deck[i].type + deck[i].value;
      i++;
      if (i < deck.length) {
        shuffleCardsFunc();
      } else {
        i = 0;
        $shuffleCards = false;
        $dealCard = true;
      }
    }, 5);
  }
  $: $shuffleCards, createDeck(), shuffleCardsFunc();
</script>

<div transition:fade>
  {#if $shuffleCards && visibleCard}
    <img class="size" src="src/lib/svg/cards/{visibleCard}.svg" alt="" />
  {:else}
    <div class="size svgBackground" />
  {/if}
</div>

<style>
  .size {
    width: 80px;
    height: 100px;
  }
  .svgBackground {
    background-color: white;
    background-image: url($lib/svg/cards/rear.svg);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
  }

  @media only screen and (max-width: 1360px) {
    .size{
      width: 62px;
      height: 80px;
    }
  }
</style>
