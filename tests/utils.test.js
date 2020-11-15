const { formatDateDigits } = require('../utils');

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