import { MatCheckboxChange } from '@angular/material/checkbox';

import { FilmInterface } from './index';

export interface ChangeInterface {
    event: MatCheckboxChange;
    film: FilmInterface;
}
