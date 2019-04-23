import { NgModule } from '@angular/core';

import { CustomFormComponent } from '../custom-form/custom-form.component';
import { FilmListComponent } from '../film-list/film-list.component';
import { FilmDetailComponent } from '../film-detail/film-detail.component';
import { SearchListComponent } from '../search-list/search-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CustomFormComponent,
        FilmListComponent,
        FilmDetailComponent,
        SearchListComponent
    ],
    imports: [CommonModule]
})
export class SearchListModule {}