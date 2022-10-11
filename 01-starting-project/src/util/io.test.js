import { it, expect, vi } from 'vitest';
import { promises as fs } from 'fs';
import writeData from './io';

//this test currently creates a new file and actually writes it out
//creates an unncessary sideffect
// it('should execute the writeFile method', () => {
//     const testData = 'test';
//     const testFileName = 'test.txt'
//     return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
// });

//call the vi and it has mock method
vi.mock('fs');
//starts vitest or jest will use its mocking algo and find the argument passedin
//and spy on all of those functions
it('should execute the writeFile method', () => {
    const testData = 'test';
    const testFileName = 'test.txt'

    writeData(testData, testFileName);
    //check to see if its called, not that node will write a new file
    expect(fs.writeFile).toBeCalled();
});