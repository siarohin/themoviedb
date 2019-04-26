import { MatCheckboxChange } from '@angular/material/checkbox';

import { Film } from './index';

export interface ChangeBox {
    event: MatCheckboxChange;
    film: Film;
}
