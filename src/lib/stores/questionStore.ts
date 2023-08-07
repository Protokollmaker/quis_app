import { browser } from '$app/environment';
import { get, writable, type Writable } from 'svelte/store';

type question = any;

type overview = {
    question: question | null,
}

export type conntroll = {
    showAnswerser: boolean,
    // when true solution if final
    delivered: boolean,
    // locks input only use for pictures to show and then the user can select the percent and deliver it.
    lockInput: boolean,
    percent: number,
};

const defaltconntroll: conntroll = {
    showAnswerser: false,
    delivered: false,
    lockInput: false,
    percent: 0,
}

type type_commplete_question_controller<T> = overview & { extra: T } & { controlls: conntroll }
type questionStore<T> = {
    next_questionarray: Array<type_commplete_question_controller<T>>,
    prev_questionarray: Array<type_commplete_question_controller<T>>,
    current: type_commplete_question_controller<T>
};

const loadmore = 10;

export function createQuestionsStore<T>(defaltFill: T, savename?: string) {
    const defaltevalueStore: questionStore<T> = {
        next_questionarray: [],
        prev_questionarray: [],
        current: {
            question: null,
            extra: JSON.parse(JSON.stringify(defaltFill)),
            controlls: JSON.parse(JSON.stringify(defaltconntroll))
        }
    }
    const obj = savename ?
        writable<questionStore<T>>(JSON.parse(localStorage.getItem("questionStore/" + savename) || JSON.stringify(defaltevalueStore))) :
        writable<questionStore<T>>(defaltevalueStore);
    if (savename)
        obj.subscribe((val: questionStore<T>) => browser && localStorage.setItem("questionStore/" + savename, JSON.stringify(val)))
    return obj;
}

// (n: number) => Array<question>
export async function nextQuestion<T>(t_obj: Writable<questionStore<T>>, defaltFill: T, saved_anwerser: number, get_more: any) {
    const obj = get(t_obj);
    // load question if none are ther are none
    if (obj.next_questionarray.length == 0) {

        const res: Array<question> = await get_more(loadmore);
        const transformed: Array<type_commplete_question_controller<T>> = [];
        res.forEach((question) => {
            const element: type_commplete_question_controller<T> = {
                question: question,
                extra: JSON.parse(JSON.stringify(defaltFill)),
                controlls: JSON.parse(JSON.stringify(defaltconntroll))
            }
            transformed.push(element);
        });
        obj.next_questionarray = obj.next_questionarray.concat(transformed);
    }
    // save values
    if (obj.current)
        obj.prev_questionarray.push(JSON.parse(JSON.stringify(obj.current)));
    if (obj.prev_questionarray.length > saved_anwerser) // cut if to long
        obj.prev_questionarray.shift(); // note only cuts 1 this mens its length only same or longer 
    // get next
    obj.current = obj.next_questionarray.pop() || {
        question: null,
        extra: JSON.parse(JSON.stringify(defaltFill)),
        controlls: JSON.parse(JSON.stringify(defaltconntroll))
    };
    t_obj.set(obj);
}


export function prevQuestion<T,>(t_obj: Writable<questionStore<T>>, defaltFill: T) {
    const obj = get(t_obj);
    if (obj.prev_questionarray.length == 0) return 0;
    obj.next_questionarray.push(obj.current);
    obj.current = obj.prev_questionarray.pop() || {
        question: null,
        extra: JSON.parse(JSON.stringify(defaltFill)),
        controlls: JSON.parse(JSON.stringify(defaltconntroll))
    };
    t_obj.set(obj);
}