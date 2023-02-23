<script>
  import { housePoints, name, userPoints } from "../stores";

  const cardType = ['clubs', 'diamods', 'hearts', 'spades'];
  const cardValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
  let deck = [];

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
  }

  function pickRandomCard () {
    let pickedCard;
    if(deck.length > 0){
      let random = Math.floor(Math.random() * deck.length);
      pickedCard = deck[random];
    } else {
      pickedCard = 'No deck to pick from..'
    }
    console.log(pickedCard)
  }

  




</script>

<div>
	<p>Hello {$name}. Points: {$userPoints}</p>
  <p>House points: {$housePoints}</p>
  <button on:click={createDeck}>Press to create a deck</button>
  <button on:click={pickRandomCard}>Pick a random card</button>
</div>

<style>

</style>
