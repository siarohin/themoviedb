import { Component, OnInit } from '@angular/core';
import { GeneratorValueService } from '../../core/index';

@Component({
    selector: 'app-realtime-data',
    templateUrl: './realtime-data.component.html',
    styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit {
    private generatorValueService: GeneratorValueService;
    public data: any;

    constructor(generatorValueService: GeneratorValueService) {
        this.generatorValueService = generatorValueService;
    }

    ngOnInit() {
        this.data = this.generatorValueService.init();
    }
}
