import { writable } from "svelte/store";

export const shuffleCards = writable();
export const dealCard = writable(false);
export const startedGame = writable(false);

export const name = writable();
export const userPoints = writable();
export const housePoints = writable();