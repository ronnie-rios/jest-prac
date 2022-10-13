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
    - side effects can be like creating a file
    - updating another file in your code etc.

### Spies
- wrappers around functions or empty replacements for functions that allow you to track if and how a function is called, replace the function with the `spy` method to get rid of side effects

### working with spies
- spies help us to see if a function was called
- ***in jest*** instead of the `vi` object, use `jest` global object from jest
```js
describe('generate report data', () => {
    it('shou;d execute logFn if provided', () => {
        //keeps tracks of the calles, arguments for function
        //our spy, allows us to find out if it executes
        const logger = vi.fn();
        generateReportData(logger);

        expect(logger).toBeCalled();
    });
});
```

### spies
- can formulate different assertions and expectations
- `toBeCalledWith()` to check what argmuents

### mocks
- a replacement for an AP that may provide some test-specific behavior instead
- can test different scenarios
- can easily replace functionality from different things
- ***in jest it's `jest` instead of `vi`***
```js
//call the vi and its mock method
vi.mock('fs');
//starts vitest or jest will use its mocking algo and mock
//the argument passed in , in this case this node module
//and spy on all of those functions
it('should execute the writeFile method', () => {
    const testData = 'test';
    const testFileName = 'test.txt'
    //call the function and it will be mocked
    writeData(testData, testFileName);
    //check to see if its called, not that node will write a new file
    expect(fs.writeFile).toBeCalled();
});
```

#### important things about mocks
- it will only impact your tests, it will only mock during the test and not affect the code
- Note: vitest `vi.mock()` method is hoisted to top, `jest.mock()` is not, should be declared before the global variables 
- the mock is only mocked during the test file

#### mocking
- can pass an empty function into the mocked function, by default it's empty, and you can pass it to keep track of it

#### managing mocking globals
- create a `__mocks__` file and can hanlde the mockd data from there
- `mockImplementationOnce()` creates the mock once and only once

#### mocking fetch
- `fetch()` is a global function or object

```js
const testResponseData = { testKey: 'testData' }
//the callback in vn will be used as the dummy function for test
const testFetch = vi.fn((url, options) => {
    //fetch returns a promise so we create a mock one here
    return new Promise((resolve, reject) => {
        //creating the response and turning it to json
        const testResponse = {
            ok: true,
            json() {
                //resolve an object 
                return new Promise((resolve, reject) => {
                    resolve(testResponseData);
                })
            }
        };
        resolve(testResponse);
    })
})

//first param mocking fetch
//second param mocks, testFetch is created above
vi.stubGlobal('fetch', testFetch);

it('should return any available response data', () => {
    const testData = { key: 'test' };
    
    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
})
```

