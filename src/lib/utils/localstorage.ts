export function allStorage() {
    const archive = [];
    for (let i = 0; i < localStorage.length; i++) {
        archive[i] = localStorage.getItem(localStorage.key(i) || "");
    }
}

export function getallStorageKeys() {
    return Object.keys(localStorage)
}