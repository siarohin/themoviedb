import { interval, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

import { RandomValueWithDate } from '../models/index';
import { getTimeInterval } from '../utils/index';

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
                const validValues = acc.filter(
                    values => getTimeInterval(Date.now(), values.time) < 20
                );
                return [...validValues, value];
            }, [])
        );
    }
}
