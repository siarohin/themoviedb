import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    FilmService,
    CoreStoreModule,
    ScheduleStoreService,
    WatchedListStoreService
} from './core/index';
import { ScheduleListModule } from './components/schedule-list/index';
import { SearchListModule } from './components/search-list/index';
import { RealtimeDataComponent } from './components/realtime-data/realtime-data.component';

@NgModule({
    declarations: [AppComponent, RealtimeDataComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ScheduleListModule,
        SearchListModule,
        CoreStoreModule
    ],
    providers: [FilmService, ScheduleStoreService, WatchedListStoreService],
    bootstrap: [AppComponent]
})
export class AppModule {}
