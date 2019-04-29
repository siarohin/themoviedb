import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operator';

import * as WatchedListActions from './index';

@Injectable()
export class WatchedListEffects {
    private actions$: Actions;
    constructor(actions$: Actions) {
        this.actions$ = actions$;
        console.log('[WatchedList EFFECTS]');
    }
}
