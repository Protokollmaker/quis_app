import { browser } from '$app/environment';
import { get, writable, type Writable } from 'svelte/store';

type question = any;

type overview = {
    question: question | null,
}

type questionStore<T,> = {
    next_questionarray: Array<overview & T>,
    prev_questionarray: Array<overview & T>,
    current: overview & T
};

const loadmore = 10;

export function createQuestionsStore<T,>(defaltFill: T, savename?: string) {
    const defaltevalueStore = {
        next_questionarray: [],
        prev_questionarray: [],
    }
    const obj = savename ?
        writable<questionStore<T>>(JSON.parse(localStorage.getItem("questionStore/" + savename) || mergeObject(defaltevalueStore, defaltFill))) :
        writable<questionStore<T>>(mergeObject(defaltevalueStore, defaltFill));
    if (savename)
        obj.subscribe((val: questionStore<T>) => browser && localStorage.setItem("questionStore/" + savename, JSON.stringify(val)))
    return obj;
}

// (n: number) => Array<question>
export async function nextQuestion<T,>(t_obj: Writable<questionStore<T>>, defaltFill: T, saved_anwerser: number, get_more: any) {
    const obj = get(t_obj);
    // load question if none are ther are none
    if (obj.next_questionarray.length == 0) {

        const res: Array<question> = await get_more(loadmore);
        const transformed: Array<overview & T> = [];
        res.forEach((question) => {
            const element: overview & T = mergeObject({
                question: question,
            }, defaltFill)
            transformed.push(element);
        });
        obj.next_questionarray = obj.next_questionarray.concat(transformed);
    }
    // save values
    if (obj.current)
        obj.prev_questionarray.push(obj.current);
    if (obj.prev_questionarray.length > saved_anwerser) // cut if to long
        obj.prev_questionarray.shift(); // note only cuts 1 this mens its length only same or longer 
    // get next
    obj.current = obj.next_questionarray.pop() || mergeObject({
        question: null,
    }, defaltFill);
    t_obj.set(obj);
}


export function prevQuestion<T,>(t_obj: Writable<questionStore<T>>, defaltFill: T) {
    const obj = get(t_obj);
    if (obj.prev_questionarray.length == 0) return 0;
    obj.next_questionarray.push(obj.current);
    obj.current = obj.prev_questionarray.pop() || mergeObject({
        question: null,
    }, defaltFill);
    t_obj.set(obj);
}

function mergeObject(obj1: any, obj2: any): any {
    const result: any = obj1;
    for (const val in obj2) {
        result[val] = obj2[val];
    }
    return result;
}