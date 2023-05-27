import { describe, expect, it } from 'vitest';
import { TagsPersent } from "./tag%mathe";

describe('sum test', () => {
    const instance = new TagsPersent();
    it('get null tag', () => {
        expect(instance.getValue("tag1")).toBe(null);
    });
    it('get and set 1 tag', () => {
        instance.addValue("tag1", true)
        expect(instance.getValue("tag1")).toBe(1);
    });
    it('get and set 2 tag', () => {
        instance.addValue("tag2", false)
        expect(instance.getValue("tag2")).toBe(0);
    });
    it('get and set 2 ture tag', () => {
        instance.addValue("tag2", true)
        expect(instance.getValue("tag2")).toBe(0.5);
    });
    it('get and set 3 ture tag', () => {
        instance.addValue("tag3", true)
        instance.addValue("tag3", false)
        instance.addValue("tag3", false)
        expect(instance.getValue("tag3")).toBe(0.3333333333333333);
    });
    it('get all tags', () => {
        expect(instance.getAllValues()).toStrictEqual([
            { name: "tag1", percent: 1 },
            { name: "tag2", percent: 0.5 },
            { name: "tag3", percent: 0.3333333333333333 }
        ]);
    });
});
