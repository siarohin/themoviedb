import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GeneratorValueService {
    private source$: Observable<number>;

    constructor() {}

    /**
     * return observable every 1s
     */
    public init(): Observable<number> {
        this.source$ = interval(1000).pipe(
            map(() => this.generateRandomValue())
        );
        return this.source$;
    }

    /**
     * generate random value
     */
    private generateRandomValue() {
        return Math.random();
    }
}
