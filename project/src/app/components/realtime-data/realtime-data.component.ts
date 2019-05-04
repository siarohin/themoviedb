import { Component, OnInit, ElementRef } from '@angular/core';

import { Observable } from 'rxjs';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { GeneratorValueService } from '../../core/index';

@Component({
    selector: 'app-realtime-data',
    templateUrl: './realtime-data.component.html',
    styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit {
    private d3: D3;
    private parentNativeElement: any;
    private generatorValueService: GeneratorValueService;

    public d3ParentElement: Selection<any, any, any, any>;

    public randomValue: Observable<number>;

    constructor(
        generatorValueService: GeneratorValueService,
        element: ElementRef,
        d3Service: D3Service
    ) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
        this.generatorValueService = generatorValueService;
    }

    ngOnInit() {
        this.randomValue = this.generatorValueService.init();

        const d3 = this.d3;
        if (this.parentNativeElement !== null) {
            this.d3ParentElement = d3.select(this.parentNativeElement);
        }

        d3.select('.content')
            .selectAll('p')
            .data([4, 8, 15, 16, 23, 42])
            .enter()
            .append('p')
            .text(d => d);
    }
}
