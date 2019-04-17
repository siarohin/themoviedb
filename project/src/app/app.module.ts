import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { FilmService } from './services/film.service';

@NgModule({
    declarations: [
        AppComponent,
        CustomFormComponent,
        FilmListComponent,
        FilmDetailComponent
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [FilmService],
    bootstrap: [AppComponent]
})
export class AppModule {}
