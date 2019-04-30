import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    FilmService,
    CoreStoreModule,
    ScheduleFacade,
    WatchedListFacade
} from './core/index';
import { ScheduleListModule } from './components/schedule-list/index';
import { SearchListModule } from './components/search-list/index';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ScheduleListModule,
        SearchListModule,
        CoreStoreModule
    ],
    providers: [FilmService, ScheduleFacade, WatchedListFacade],
    bootstrap: [AppComponent]
})
export class AppModule {}
