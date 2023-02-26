import { writable } from 'svelte/store';

export const name = writable();
export const userPoints = writable(50);
export const housePoints = writable(100);
export const shuffleCards = writable();
export const dealCard = writable(false);
