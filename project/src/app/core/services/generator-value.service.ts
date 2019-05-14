import { interval, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

export interface RandomValueWithDate {
    value: number;
    time: Date;
}

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
            scan((acc, value: RandomValueWithDate) => [...acc, value], [])
        );
    }
}
