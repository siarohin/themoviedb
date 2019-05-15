import { interval, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

import { RandomValueWithDate } from '../models/index';
import { getTimeInterval } from '../utils/index';

const timeInSeconds = 20;
const intervalInSeconds = 1000;

export class GeneratorValueService {
    constructor() {}

    /**
     * return array with random value every 1s
     */
    public getArrayWithRandomValue(): Observable<Array<RandomValueWithDate>> {
        return interval(intervalInSeconds).pipe(
            map(() => ({
                value: Math.random(),
                time: Date.now()
            })),
            scan((acc, value: RandomValueWithDate) => {
                const notValidValuesIndex = acc.findIndex(
                    values => getTimeInterval(values.time) > timeInSeconds
                );
                const validValues = acc.slice(notValidValuesIndex + 1);
                return [...validValues, value];
            }, [])
        );
    }
}
