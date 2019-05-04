import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealtimeDataComponent } from './realtime-data.component';
import { GeneratorValueService } from '../../core/index';

@NgModule({
    declarations: [RealtimeDataComponent],
    imports: [CommonModule],
    providers: [GeneratorValueService]
})
export class RealtimeDataModule {}
