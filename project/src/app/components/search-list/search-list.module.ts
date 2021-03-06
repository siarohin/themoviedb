import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CustomFormComponent } from '../custom-form/custom-form.component';
import { FilmListComponent } from '../film-list/film-list.component';
import { FilmDetailComponent } from '../film-detail/film-detail.component';
import { SearchListComponent } from '../search-list/search-list.component';

@NgModule({
    declarations: [
        CustomFormComponent,
        FilmListComponent,
        FilmDetailComponent,
        SearchListComponent
    ],
    imports: [CommonModule, BrowserAnimationsModule, MatCheckboxModule]
})
export class SearchListModule {}
