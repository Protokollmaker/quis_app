import { browser } from "$app/environment";
import { writable } from 'svelte/store';

const name_localStorage = "userdata";

type userdata = {
    page_question: number,
}

export const userdata = writable<userdata>(
    browser && (JSON.parse(localStorage.getItem(name_localStorage) || "{}"))
);

userdata.subscribe((val: userdata) => browser && localStorage.setItem(name_localStorage, JSON.stringify(val)))