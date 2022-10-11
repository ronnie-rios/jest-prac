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
### what should and should not be tested?
- only test your code! 
- **don't** test native node packages nor APIS
- why? cause you wanna test the code you can change

#### Examples
- form data, can test if youre getting form data, and other such. however you should not test `.queryselector()` since it a native browser method

- don't test `fetch()` if it works as intended, like fetching from a random API

- write separate tests for your backend and your frontend, each would be independent

- do test your client-side reaction to different responses & errors

### a good test
- arrange - act - assert
- only test **one** thing
- focus on the essecnce of a test when arranging
- keep your number of assertions `expect()` **low**, too many assertions leads to not testing one thing, should generally only test one thing

### what is one thing?
- one thing means one feature, like a validate input, or transforming data
- even for validation, like checking if the input field is empty should be different from a test that would test to make sure the input has certain length
- as long as it relates to what is described in the `it()` block

### toBe vs toEqual
- {} != {}, objects are reference values, and are treated as totally different values. even if they have the same properties and values.
- `toBe()` compares it to be exactly, and [] != [] and {} != {}
- `toEqual()` compares it as a deep comparison; checks for the values but not their existence in memory

## Asynch Testing

#### callback + try / catch block
```js
it('should generate a token value', (done) => {
  const testUserEmail = 'test@test.com';

  generateToken(testUserEmail, (err, token) => {
    // expect(token).toBeDefined();

    try {
      expect(token).toBeDefined();
      // expect(token).toBe(2);
      done();
    } catch (err) {
      done(err);
    }
  });
});
```

#### async / await
```js
it('should generate a token value', async () => {
  const testUserEmail = 'test@test.com';

  const token = await generateTokenPromise(testUserEmail);

  expect(token).toBeDefined();
});
```

## Hooks in Testing

- `beforeAll()`
- `beforeEach()`
- `afterAll()`
- `afterEach()`

- if used in a suite, applies to all tests within that it block
- if data updates, and you want to reset your tests, run `beforeEach()` or `afterEach()`

### concurrent tests
- `concurrent` can reudce the amount of time your tests need to execute. 
- downside: can perform clashing (global) state manipulations that intefere with each other
- `it`can take a method called `concurrent`, which is like an annotation, and will run in parallel with other tests that have the concurrent keyword.
```js
it.concurrent('example case', () => {
    //arrange
    //act
    //assert
});
```
- can attach to a suite, so all tests in the `describe` block will run at the same time
```js
describe.concurrent(() => {
    it('test1', () => {
        //test
    });

    it('test2', () => {
        //test2
    })
});
```

## mocking and spying
- dealing with side effects