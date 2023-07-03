import { browser } from "$app/environment";
import { writable } from "svelte/store";


type TagsPersentElement = {
    name: string,
    number: number,
    summe: number,
    percent: number
};

export function getvalue(obj: Array<TagsPersentElement>, id: string) {
    if (!browser) return -1;
    const result = obj.findIndex(item => item["name"] === id)
    if (result == -1) return null;
    return obj[result].percent;
}

export function addValue(obj: Array<TagsPersentElement>, id: string, number: boolean | null | number) {
    if (!browser) return { error: -2, obj: obj };
    if (id == null || number == null) return { error: 1, obj: obj };
    if (typeof number == "boolean") { number ? number = 1 : number = 0; }
    const result = obj.findIndex(item => item["name"] === id);
    if (result == -1) {
        obj.push({
            name: id,
            summe: number,
            number: 1,
            percent: number
        });
        return { error: 0, obj: obj };
    }
    obj[result].summe += number;
    obj[result].number += 1;
    obj[result].percent = obj[result].summe / obj[result].number;
    return { error: 0, obj: obj };
}

export function getQuestionIDs(t_obj: Array<TagsPersentElement>) {
    const Array: Array<string> = [];
    for (const obj of t_obj) {
        Array.push(obj.name)
    }
    return Array;
}

export function getArrayOrderdpercentAsc(t_obj: Array<TagsPersentElement>) {
    const obj: Array<TagsPersentElement> = JSON.parse(JSON.stringify(t_obj));
    console.log(obj);
    const sorted_arry: Array<TagsPersentElement> = obj.sort((a, b) => {
        return a.percent - b.percent;
    });
    return getQuestionIDs(sorted_arry);
}

export function getCurrentQuestionData() {
    return browser && (JSON.parse(localStorage.getItem(name_localStorage) || "[]"))
}

export function getQuestionsDoneNum(t_obj: Array<TagsPersentElement>) {
    if (!browser) return 0;
    let count = 0;
    for (const obj of t_obj) {
        count += obj.number;
    }
    return count;
}

export function getQuestionUnicDoneNum(t_obj: Array<TagsPersentElement>) {
    return t_obj.length;
}

export function getAvarageQuestionPercente(t_obj: Array<TagsPersentElement>): number {
    if (!browser) return 0;
    let percent = 0;
    let count = 0;
    for (const obj of t_obj) {
        percent += obj.percent;
        count += 1;
    }
    return percent / count;
}

/*// todo Bug when one question is deleted a other wont be synce
export async function syncQuestion(obj: Array<TagsPersentElement>) {
    if (!browser) return { error: -2, obj: obj };
    const res = await supabaseClient.rpc("helper_questions_count");
    if (res.error) { return { error: -1, obj: obj } }
    let replayed = 0;
    const pageSize = 10;
    for (let i = 0; res.data > obj.length; i++) {
        const res0 = await supabaseClient.from("Questions")
            .select("id")
            .order("created_at", { ascending: false })
            .range(i * pageSize, i * pageSize + pageSize);
        if (res0.data == null) continue;
        for (const data of res0.data) {
            const result = obj.findIndex(item => item["name"] === data.id);
            if (result == -1) {
                replayed += 1;
                obj.push({
                    name: data.id,
                    summe: 0,
                    number: 0,
                    percent: 0
                });
            }
        }
    }
    return { error: replayed, obj: obj }
}*/

const name_localStorage = "questionData";

export const questionData = writable<Array<TagsPersentElement>>(
    browser && (JSON.parse(localStorage.getItem(name_localStorage) || "[]"))
);

questionData.subscribe((val: Array<TagsPersentElement>) => browser && localStorage.setItem(name_localStorage, JSON.stringify(val)))