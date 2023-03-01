<script>
  import { name } from "../stores";
  let inputName = '';
  function saveName() {
    if(inputName.length <= 8){
      $name = inputName;
    } else {
      !alert('Name has to be 8 or less characters!')
    }
  }
</script>

<div class="corner">
  <div class="nameInputContainer">
    <p>Enter playername:</p>
    <input type="text" bind:value={inputName} />
    <button on:click={saveName}>Save name</button>
  </div>
</div>

<style>
  .nameInputContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 200px;
    margin-top: 20vh;
  }

  .nameInputContainer > p {
    margin-right: 5px;
  }

  .nameInputContainer > button {
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

  .nameInputContainer > button:focus,
  .nameInputContainer > button:hover {
    background: #bcbcbc;
  }
</style>
