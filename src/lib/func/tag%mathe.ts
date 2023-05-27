
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
    constructor() {
        this.array;
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
    array: Array<TagsPersentElement> = [];

}