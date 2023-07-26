export function uuidv4(): string {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function genDeviceID() {
    return uuidv4();
}