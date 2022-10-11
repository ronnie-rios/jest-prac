import { vi } from 'vitest';

export const promises = {
    writeFile: vi.fn((path, data) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    })
};

//when called mock, it will use this and if it doesnt find one
//will replace with empty, however this method will use