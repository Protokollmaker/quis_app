import type { anyobject } from "$lib/types/types";

// overrides obj1 if value is in obj2 and will sum the objects
export function mergeObject(obj1: anyobject, obj2: anyobject) {
    const result: anyobject = obj1;
    for (const val in obj2) {
        result[val] = obj2[val];
    }
    return result;
}

export function emptyObject(obj: anyobject) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
}

export function depeCopy(obj: anyobject) {
    return JSON.parse(JSON.stringify(obj));
}