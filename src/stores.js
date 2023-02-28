import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const shuffleCards = writable();
export const dealCard = writable(false);

export const name = writable("Guest");
export const userPoints = writable(500);
export const housePoints = writable(10000);

if (typeof localStorage !== "undefined") {
  //Users name as a store and assigned to localstorage so you can "Jump right in"
  // export const name = writable(storedName || "Guest");
  name.subscribe((value) => (localStorage.name = value));

  //User points as a store and assigned to localstorage
  // export const userPoints = writable(storedUserPoints || 500);
  userPoints.subscribe((value) => (localStorage.userPoints = value));

  //House points so you can "save" and take up the game later on
  // // export const housePoints = writable(storedHousePoints || 10000);
  housePoints.subscribe((value) => (localStorage.housePoints = value));

  //The above works in different steps.
  //First we assign a local const with the value in the localstorage
  //Then we export a writable store version of that local const or default a value if there is none
  //Then we subscribe to the exported store so in case the value changes we set the localstorage const to the value
  //Easy as 1.. 2.. 3!
}
