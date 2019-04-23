import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FilmService } from './core/index';

import { ScheduleListModule } from './components/schedule-list/schedule-list.module';
import { SearchListModule } from './components/search-list/search-list.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ScheduleListModule,
        SearchListModule
    ],
    providers: [FilmService],
    bootstrap: [AppComponent]
})
export class AppModule {}
