import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GeneratorValueService {
    private source$: Observable<number>;

    constructor() {
        this.source$ = interval(1000).pipe(
            map(() => this.generateRandomValue())
        );
    }

    /**
     * return observable every 1s
     */
    public init(): Observable<number> {
        return this.source$;
    }

    private generateRandomValue() {
        return Math.random();
    }
}
