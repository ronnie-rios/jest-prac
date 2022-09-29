const functions = require('./app');

//takes in a description
test('adds 2 +2 = 4', () => {
    //expect is the testing the function
    expect(functions.add(2, 2))
    //matcher function
    .toBe(4)
});