import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    FilmService,
    GeneratorValueService,
    CoreStoreModule,
    ScheduleStoreService,
    WatchedListStoreService
} from './core/index';
import { ScheduleListModule } from './components/schedule-list/index';
import { SearchListModule } from './components/search-list/index';
import { RealtimeDataModule } from './components/realtime-data/index';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ScheduleListModule,
        SearchListModule,
        CoreStoreModule,
        RealtimeDataModule
    ],
    providers: [
        FilmService,
        GeneratorValueService,
        ScheduleStoreService,
        WatchedListStoreService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
