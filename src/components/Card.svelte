<script>
  import { fade } from 'svelte/transition';
  export let card;
  //Club Cards
  import club10 from '$lib/svg/cards/clubs/10.svg';
  import club2 from '$lib/svg/cards/clubs/2.svg';
  import club3 from '$lib/svg/cards/clubs/3.svg';
  import club4 from '$lib/svg/cards/clubs/4.svg';
  import club5 from '$lib/svg/cards/clubs/5.svg';
  import club6 from '$lib/svg/cards/clubs/6.svg';
  import club7 from '$lib/svg/cards/clubs/7.svg';
  import club8 from '$lib/svg/cards/clubs/8.svg';
  import club9 from '$lib/svg/cards/clubs/9.svg';
  import clubAce from '$lib/svg/cards/clubs/ace.svg';
  import clubJack from '$lib/svg/cards/clubs/jack.svg';
  import clubKing from '$lib/svg/cards/clubs/king.svg';
  import clubQueen from '$lib/svg/cards/clubs/queen.svg';
//Diamond Cards
  import diamond10 from '$lib/svg/cards/diamonds/10.svg';
  import diamond2 from '$lib/svg/cards/diamonds/2.svg';
  import diamond3 from '$lib/svg/cards/diamonds/3.svg';
  import diamond4 from '$lib/svg/cards/diamonds/4.svg';
  import diamond5 from '$lib/svg/cards/diamonds/5.svg';
  import diamond6 from '$lib/svg/cards/diamonds/6.svg';
  import diamond7 from '$lib/svg/cards/diamonds/7.svg';
  import diamond8 from '$lib/svg/cards/diamonds/8.svg';
  import diamond9 from '$lib/svg/cards/diamonds/9.svg';
  import diamondAce from '$lib/svg/cards/diamonds/ace.svg';
  import diamondJack from '$lib/svg/cards/diamonds/jack.svg';
  import diamondKing from '$lib/svg/cards/diamonds/king.svg';
  import diamondQueen from '$lib/svg/cards/diamonds/queen.svg';
//Heart Cards
  import heart10 from '$lib/svg/cards/hearts/10.svg';
  import heart2 from '$lib/svg/cards/hearts/2.svg';
  import heart3 from '$lib/svg/cards/hearts/3.svg';
  import heart4 from '$lib/svg/cards/hearts/4.svg';
  import heart5 from '$lib/svg/cards/hearts/5.svg';
  import heart6 from '$lib/svg/cards/hearts/6.svg';
  import heart7 from '$lib/svg/cards/hearts/7.svg';
  import heart8 from '$lib/svg/cards/hearts/8.svg';
  import heart9 from '$lib/svg/cards/hearts/9.svg';
  import heartAce from '$lib/svg/cards/hearts/ace.svg';
  import heartJack from '$lib/svg/cards/hearts/jack.svg';
  import heartKing from '$lib/svg/cards/hearts/king.svg';
  import heartQueen from '$lib/svg/cards/hearts/queen.svg';
//Spade Cards
  import spade10 from '$lib/svg/cards/spades/10.svg';
  import spade2 from '$lib/svg/cards/spades/2.svg';
  import spade3 from '$lib/svg/cards/spades/3.svg';
  import spade4 from '$lib/svg/cards/spades/4.svg';
  import spade5 from '$lib/svg/cards/spades/5.svg';
  import spade6 from '$lib/svg/cards/spades/6.svg';
  import spade7 from '$lib/svg/cards/spades/7.svg';
  import spade8 from '$lib/svg/cards/spades/8.svg';
  import spade9 from '$lib/svg/cards/spades/9.svg';
  import spadeAce from '$lib/svg/cards/spades/ace.svg';
  import spadeJack from '$lib/svg/cards/spades/jack.svg';
  import spadeKing from '$lib/svg/cards/spades/king.svg';
  import spadeQueen from '$lib/svg/cards/spades/queen.svg';

  const allCards = {
    club2: club2,
    club3: club3,
    club4: club4,
    club5: club5,
    club6: club6,
    club7: club7,
    club8: club8,
    club9: club9,
    club10: club10,
    clubJack: clubJack,
    clubQueen: clubQueen,
    clubKing: clubKing,
    clubAce: clubAce,
    diamond2: diamond2,
    diamond3: diamond3,
    diamond4: diamond4,
    diamond5: diamond5,
    diamond6: diamond6,
    diamond7: diamond7,
    diamond8: diamond8,
    diamond9: diamond9,
    diamond10: diamond10,
    diamondJack: diamondJack,
    diamondQueen: diamondQueen,
    diamondKing: diamondKing,
    diamondAce: diamondAce,
    heart2: heart2,
    heart3: heart3,
    heart4: heart4,
    heart5: heart5,
    heart6: heart6,
    heart7: heart7,
    heart8: heart8,
    heart9: heart9,
    heart10: heart10,
    heartJack: heartJack,
    heartQueen: heartQueen,
    heartKing: heartKing,
    heartAce: heartAce,
    spade2: spade2,
    spade3: spade3,
    spade4: spade4,
    spade5: spade5,
    spade6: spade6,
    spade7: spade7,
    spade8: spade8,
    spade9: spade9,
    spade10: spade10,
    spadeJack: spadeJack,
    spadeQueen: spadeQueen,
    spadeKing: spadeKing,
    spadeAce: spadeAce
  };
</script>

<div transition:fade>
  {#if card != null}
  <img class="size" src="{allCards[card]}" alt="">
  {/if}
</div>

<style>
  .size{
    width: 80px;
    height: 100px;
  }
</style>
