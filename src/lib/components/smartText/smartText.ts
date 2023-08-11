import Katexfix from "./Katexfix.svelte";

export type smartText_Out = Array<{ component?: any, value: any }>
function katexfunction(t_text: string) {
    const arr = t_text.split("$$");
    const out: smartText_Out = [];
    arr.forEach((element, index) => {
        if (index % 2) {
            out.push({ component: Katexfix, value: element });
        } else {
            out.push({ value: element });
        }
    });
    return out;
}

export const smartTextKatex = { func: katexfunction };