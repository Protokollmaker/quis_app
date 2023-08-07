export type type_Text_Valitation = Array<{
    // this number must be between 100 and 0
    percent: number,
    pattons: Array<string>
}>

export type type_Text_Valitations = {
    validatepattons: type_Text_Valitation,
    type: "wordlist" | "redex",
    userOverried: boolean,
    text: string
};

export function text_Valitation(validatepattons: type_Text_Valitation, text: string, type: string) {
    if (type != "wordlist") {
        console.log("not immplemented");
        return 0;
    };
    if (!text) return 0;
    let percent = 0;
    for (const validatepatton of validatepattons) {
        let isIncludet = false;
        for (const patton of validatepatton.pattons) {
            if (text.includes(patton)) {
                isIncludet = true;
                break;
            }
        }
        if (isIncludet) {
            percent += validatepatton.percent;
        }
    }
    return percent / 100;
}