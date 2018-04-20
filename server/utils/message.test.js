const expect = require('expect');

const { generateMsg, generateLocationMsg } = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        const from = 'zz';
        const latitude = '40';
        const longitude = '-50';
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const res = generateLocationMsg(from, latitude, longitude);
        expect(res).toMatchObject({
            from,
            url,
        });
        expect(typeof res.createdAt).toBe('number');
    });
});
