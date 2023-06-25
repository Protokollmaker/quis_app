import { browser } from "$app/environment";
import { get, writable } from 'svelte/store';

const name_localStorage = "questionstore";
// läde soviele fragen wie hier angegeben
const loadmore = 10;
const saved_anwerser = 10;

type question = any;
type anwser = any;

type overview = {
    question: question | null,
    anwser: anwser | null,
}

type questionarray = {
    next_questionarray: Array<overview>,
    prev_questionarray: Array<overview>,
    current_question: question,
    current_anwerser: anwser,
};

const defaltevalue = JSON.stringify({
    next_questionarray: [],
    prev_questionarray: [],
    current_question: null,
    current_anwerser: null
})

export const questionarray = writable<questionarray>(
    browser && (JSON.parse(localStorage.getItem(name_localStorage) || defaltevalue))
);

//questionarray.subscribe((val: questionarray) => browser && localStorage.setItem(name_localStorage, JSON.stringify(val)))

// (n: number) => Array<question>
export async function next_question(get_more: any) {
    const question = get(questionarray);
    // lode question if no are ther
    if (question.next_questionarray.length == 0) {
        const res: Array<question> = await get_more(loadmore);
        const transformed: Array<overview> = []
        res.forEach((data) => {
            transformed.push({
                question: data,
                anwser: {}
            })
        })
        question.next_questionarray = transformed;
    }
    // save values
    if (question.current_question != null) {
        question.prev_questionarray.push({
            question: question.current_question,
            anwser: question.current_anwerser
        })
    }

    if (question.prev_questionarray.length > saved_anwerser) {
        question.prev_questionarray.shift();
    }
    // get next
    const question_next = question.next_questionarray.pop()
    question.current_question = question_next?.question;
    question.current_anwerser = question_next?.anwser;
    questionarray.set(question);
}

export function prev_question() {
    const question = get(questionarray);
    if (question.prev_questionarray.length == 0) return 0;
    // save currend question
    const current_question: overview = {
        question: question.current_question,
        anwser: question.current_anwerser
    };
    question.next_questionarray.push(current_question);
    // get prev question
    const question_next = question.prev_questionarray.pop();
    question.current_question = question_next?.question;
    question.current_anwerser = question_next?.anwser;
    questionarray.set(question);
}
