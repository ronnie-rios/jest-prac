const functions = require('./app');

//takes in a description
//adding toBe
test('adds 2 +2 = 4', () => {
    //expect is the testing the function
    expect(functions.add(2, 2))
    //matcher function
    .toBe(4)
});

//null
test('should be null', () => {
    expect(functions.isNull()).toBeNull();
});

//falsy
test('should be falsy value', () => {
    expect(functions.checkValue(undefined)).toBeFalsy();
});

//toequal comparing objects
test('user should be a momo zingo obj', () => {
    //to equal will compare objects and arrays?
    expect(functions.createUser()).toEqual({
        firstname: 'momo',
        lastname: 'zingo'
    });
});

//working with async data
test('expect user to be - Leanne Graham', () => {
    //assertions
   // expect.assertions(1)
    return functions.fethchData()
        .then(data => {
            expect(data.name).toEqual('Leanne Graham')
        })
});