import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { userdata } from "./userdata";

describe('user data defealt test', () => {
    it('get null tag', () => {
        expect(get(userdata).page_question || 0).toBe(0);
    });
});