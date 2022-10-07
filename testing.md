# Testing

## manual testing
- tedious and cumbersome, testing features one by one
if you don't test everything, you will miss something
- good to test out some things tho

## automated testing
- write some code that tests the code!
- executed during dev, and runs prefined and tests most things automatically
- initial setup, but less work than manual
- predictable & consistent
- high / complete code & scenario coverage can be achieved

## unit testing v integration and end-to-end testing

### unit testing
- test the individual blocks of an app
- every test is standalone
- quickly spot and pinpoint breaking changes and errors
- ignore actual user flows

### integration testing
- test the combo of building blocks
- verifiy if blocks work together
- if unit works standalone, can fail when combine
- test parts of processes
- hard to spot root of an error
- test realistic user flows and behaviors
- hard to cover everything

### E2E
- test entire flows and application features
- test the actual **things** thins real users would do

### summary
- do a combo of the above ^

## arrange act assert
- arrange: definte the test env & values
- act: run the actual code / function that should be test
- assert: evaluate the produced value / result and compare it to the expected value / result

```js
it('should add all nums in an arr', () => {
    //arrange
    const numbers = [1,2,3]
    //act
    const result = add(numbers);
    //assert
    const expectedResult = numbers.reduce(
        (prevValue, curValue) =>  prevValue + curValue, 0)
    expect(result).toBe(expectedResult)
});
```