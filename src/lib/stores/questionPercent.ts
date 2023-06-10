import { get, writable } from "svelte/store";


type TagsPersentElement = {
    name: string,
    number: number,
    summe: number
};

export type PercentValuePaar = {
    name: string,
    percent: number
}

export class TagsPersent {
    constructor(t_cookie_name: string, t_array: Array<TagsPersentElement> | null = null) {
        this.cookie_name = t_cookie_name;
        if (t_array != null) {
            this.array = t_array;
        } else {
            this.array = JSON.parse(localStorage.getItem(this.cookie_name) || "[]")
        }
        this.updateValues();
    }
    addValue(tag: string, bool: boolean) {
        const result = this.array.findIndex(item => item["name"] === tag)
        if (result == -1) {
            this.array.push({
                name: tag,
                summe: bool ? 1 : 0,
                number: 1
            });
            return 0;
        }
        this.array[result].summe += bool ? 1 : 0;
        this.array[result].number += 1;
        this.save();
        this.updateValue(tag);
        return 0;
    }

    getValue(tag: string) {
        const result = this.array.findIndex(item => item["name"] === tag)
        if (result == -1) return null;
        const obj = this.array[result];
        return obj.summe / obj.number;
    }

    getAllValues() {
        const list: Array<PercentValuePaar> = [];
        for (const element of this.array) {
            list.push({
                name: element.name,
                percent: element.summe / element.number
            });
        }
        return list;
    }

    updateValue(tag: string) {
        const array_out = get(this.array_out);
        array_out[tag] = this.getValue(tag);
        this.array_out.set(array_out);
    }

    updateValues() {
        const array_out: any = {};
        for (const element of this.array) {
            array_out[element.name] = element.summe / element.number;
        }
        this.array_out.set(array_out);
    }

    save() {
        localStorage.setItem(this.cookie_name, JSON.stringify(this.array))
    }

    get percent() {
        return this.array_out;
    }

    array: Array<TagsPersentElement> = [];
    array_out = writable<any>({});
    cookie_name: string;
}

export const QuestionAnswers = new TagsPersent("anwerser");