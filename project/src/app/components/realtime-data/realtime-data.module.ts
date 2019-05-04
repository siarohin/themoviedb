import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3Service } from 'd3-ng2-service';

import { RealtimeDataComponent } from './realtime-data.component';
import { GeneratorValueService } from '../../core/index';

@NgModule({
    declarations: [RealtimeDataComponent],
    imports: [CommonModule],
    providers: [GeneratorValueService, D3Service]
})
export class RealtimeDataModule {}
