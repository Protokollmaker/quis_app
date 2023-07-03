import { browser } from "$app/environment";
import { writable } from "svelte/store";

const name_localStorage = "questionBookmark";

type Bookmark = {
    id: string,
    type: string, // if multipe colection are used like Bookmakr difficult 
}

export const questionBookmarks = writable<Array<Bookmark>>(
    browser && (JSON.parse(localStorage.getItem(name_localStorage) || "[]"))
);

questionBookmarks.subscribe((val: Array<Bookmark>) => browser && localStorage.setItem(name_localStorage, JSON.stringify(val)))

///////////////////////////////////////////////////////////////////////////

export function addBookmark(questionBookmarks: Array<Bookmark>, id: string, type: string) {
    questionBookmarks.push({
        id: id,
        type: type
    });
    return questionBookmarks;
}

export function rmBookmark(questionBookmarks: Array<Bookmark>, id: string, type: string) {
    const result = questionBookmarks.findIndex(item => item["id"] === id && item["type"] === type);
    if (result == -1) return questionBookmarks;
    questionBookmarks.splice(result, 1);
    return questionBookmarks;
}

export function hasBookmark(questionBookmarks: Array<Bookmark>, id: string, type: string) {
    const result = questionBookmarks.findIndex(item => item["id"] === id && item["type"] === type);
    if (result == -1) return false;
    return true;
}

export function getBookmarkColection(t_obj: Array<Bookmark>, type: string) {
    if (!browser) return [];
    const array: Array<Bookmark> = []
    for (const obj of t_obj) {
        if (obj.type == type) array.push(obj);
    }
    return array;
}

export function getBookmarkIds(t_obj: Array<Bookmark>) {
    const array: Array<string> = []
    for (const obj of t_obj) {
        array.push(obj.id);
    }
    return array;
}