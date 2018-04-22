const expect = require('expect');

const { isRealString } = require('./validation');

describe('test isRealString', () => {
    it('should reject non-string values', () => {
        const _testStr = 12;
        expect(isRealString(_testStr)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const _testStr = '   ';
        expect(isRealString(_testStr)).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const _testStr = '$3sdf @#';
        expect(isRealString(_testStr)).toBe(true);
    });
});
