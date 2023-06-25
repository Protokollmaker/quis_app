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