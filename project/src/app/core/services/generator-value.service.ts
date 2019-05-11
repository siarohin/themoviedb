import { interval, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class GeneratorValueService {
    private intervalValue$: Observable<number>;
    private randomValue$: Observable<number>;

    constructor() {}

    /**
     * return observable random value every 1s
     */
    public init(): Observable<number> {
        return this.generateIntervalValue().pipe(
            mergeMap(() => this.generateRandomValue())
        );
    }

    /**
     * generate interval 1s
     */
    private generateIntervalValue(): Observable<number> {
        this.intervalValue$ = interval(100);
        return this.intervalValue$;
    }

    /**
     * generate random value
     */
    private generateRandomValue(): Observable<number> {
        this.randomValue$ = of(Math.random());
        return this.randomValue$;
    }
}
