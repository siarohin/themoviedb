import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { GeneratorValueService } from '../../core/index';

@Component({
    selector: 'app-realtime-data',
    templateUrl: './realtime-data.component.html',
    styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit, OnDestroy {
    private d3: D3;
    private parentNativeElement: any;
    private generatorValueService: GeneratorValueService;
    private data: Array<number>;
    private randomValue: Observable<number>;
    private randomValueSubscription: Subscription;

    public d3ParentElement: Selection<any, any, any, any>;

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
        this.data = [];
        this.randomValue = this.generatorValueService.init();

        if (this.parentNativeElement !== null) {
            this.d3ParentElement = this.d3.select(this.parentNativeElement);
        }

        // Add svg to container
        const areaSVG = this.d3
            .select('.content')
            .append('svg')
            .attr('width', 100 + '%')
            .attr('height', 500 + 'px');

        const defaultScale = this.d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, 300]);

        this.randomValueSubscription = this.randomValue.subscribe(value => {
            this.data = [...this.data, value];
            areaSVG
                .selectAll('circle')
                .data([...this.data, value])
                .enter()
                .append('circle')
                .attr('r', 3)
                .attr('cx', (d, i) => (i + 10) * 10)
                .attr('cy', d => defaultScale(d))
                .attr('data', d => d);
        });
    }

    ngOnDestroy() {
        this.randomValueSubscription.unsubscribe();
    }
}
