const functions = require('./app');

//takes in a description
test('adds 2 +2 = 4', () => {
    //expect is the testing the function
    expect(functions.add(2, 2))
    //matcher function
    .toBe(4)
});

test('should be null', () => {
    expect(functions.isNull()).toBeNull();
});

test('should be falsy value', () => {
    expect(functions.checkValue(undefined)).toBeFalsy();
});