import { interval, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

import { RandomValueWithDate } from '../models/index';

export class GeneratorValueService {
    constructor() {}

    /**
     * return array with random value every 1s
     */
    public getArrayWithRandomValue(): Observable<Array<RandomValueWithDate>> {
        return interval(1000).pipe(
            map(() => ({
                value: Math.random(),
                time: Date.now()
            })),
            scan((acc, value: RandomValueWithDate) => {
                if (acc.length < 21) {
                    return [...acc, value];
                } else {
                    acc.shift();
                    return [...acc, value];
                }
            }, [])
        );
    }
}
