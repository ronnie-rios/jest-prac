
import { describe, it, expect, vi } from 'vitest';
import { generateReportData } from './data';

describe('generate report data', () => {
    it('shou;d execute logFn if provided', () => {
        //keeps tracks of the calles, arguments for function
        //our spy, allows us to find out if it executes
        const logger = vi.fn();
        generateReportData(logger);

        expect(logger).toBeCalled();
    });
});