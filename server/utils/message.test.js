const expect = require('expect');

const { generateMsg } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'zz';
        const text = 'screw u';
        const res = generateMsg(from, text);
        // could use toMatchObject instead
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
});
