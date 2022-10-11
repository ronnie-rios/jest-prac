import { describe, it, expect } from 'vitest';
import { generateToken, generateTokenPromise } from './async-example';

describe('async code', () => {
    //call when done for async
    it('should generate a token 1', (done) => {
        //arrange
        const testUserEmail = 'test@test.com';

        generateToken(testUserEmail, (err, token) => {
            //use try catch to see the err
            try {
                // wrong assertion, it throws an error
                expect(token).toBeDefined();
            } catch (error) {
                //call done and it will wait till done is called
                //finds the assertion 
                done(error)
            }
        });
    });

    it('should generate a token 2', async () => {
        const testUserEmail = 'test@test.com';

        const token = await(generateTokenPromise(testUserEmail))
        //expect can expect promises 
        expect(token).toBeDefined();
    });

});




