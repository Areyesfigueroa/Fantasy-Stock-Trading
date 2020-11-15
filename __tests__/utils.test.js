const { formatDateDigits, getLatestWeekday } = require('../utils');

test('Should always output two digits or more', () => {
    const cases  = [
        { value: 1, expect: '01' },
        { value: 10, expect: '10' },
        { value: 123, expect: '123' }
    ];

    cases.forEach(test => {
        const result = formatDateDigits(test.value);
        expect(result).toBe(test.expect);
    });
})

test('Should output latest weekday in format YYYYMMDD', () => {
    const cases = [
        { value: new Date('2020/11/15'), expect: '20201113' }, //From Weekend
        { value: new Date('2020/11/13'), expect: '20201113' }, //From Weekday
        { value: new Date('2020/11/02'), expect: '20201102' } //Single Digit test
    ]

    cases.forEach(test => {
        const result = getLatestWeekday(test.value);
        expect(result).toBe(test.expect);
    });
})