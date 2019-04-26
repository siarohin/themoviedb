import { MatCheckboxChange } from '@angular/material/checkbox';

import { Film } from './index';

export interface Change {
    event: MatCheckboxChange;
    film: Film;
}
