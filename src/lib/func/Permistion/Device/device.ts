const name_localStorage = "DeviceID";


export function uuidv4(): string {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function setDeviceID() {
    const defalte = {
        device: uuidv4(),
        lastsend: 0
    }
    localStorage.setItem(name_localStorage, JSON.stringify(defalte))
}

export function getDeviceID() {
    let device = localStorage.getItem(name_localStorage);
    if (!device) {
        setDeviceID();
        device = localStorage.getItem(name_localStorage);
    }
    return JSON.parse(device || "{}");
}

export function setDeviceTime() {
    const time = new Date();
    const obj = getDeviceID();
    obj.lastsend = time.getTime();
    localStorage.setItem(name_localStorage, JSON.stringify(obj))
}