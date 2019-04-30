import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { SearchListComponent } from './components/search-list/search-list.component';

const routes: Routes = [
    { path: 'list', component: ScheduleListComponent },
    { path: 'search', component: SearchListComponent },
    { path: '**', redirectTo: 'search', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
