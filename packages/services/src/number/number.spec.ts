import { describe, expect, it } from '@jest/globals';
import {extractLastNumberFromUrl} from "./number";

describe('Number functions', () => {
    describe('extractLastNumberFromUrl', () => {
        it('should return a number when the string is received', () => {
            expect(extractLastNumberFromUrl('https://www.google.com/123')).toEqual(123);
        });

        it('should return a 0 when the url is undefined', () => {
            expect(extractLastNumberFromUrl()).toEqual(0);
        });
    })
});