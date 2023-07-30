import { browser } from "$app/environment";

const name_localStorage = "CanCreateAccount";

// I now this is unsave but it only has to deter people and be same if loged out
// onte use aggan
export function setCanCreateAccount(secret: string) {
    const defalte = {
        secret
    };
    localStorage.setItem(name_localStorage, JSON.stringify(defalte));
}

function getCanCreateAccount(): undefined | { secret: string } {
    const secret = localStorage.getItem(name_localStorage);
    return JSON.parse(secret || "{}");
}

export function canCreateAccount() {
    const secret = browser && getCanCreateAccount();
    if (typeof secret == "boolean") return false;
    return secret?.secret == "1ed1ae91-d6a1-4021-ad64-79664ed73c75" ? true : false;
}