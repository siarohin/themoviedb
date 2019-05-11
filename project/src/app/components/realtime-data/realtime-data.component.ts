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

        const margin = { top: 80, right: 100, bottom: 80, left: 80 };
        const height = 800 - margin.top - margin.bottom;
        const width = 990 - margin.left - margin.right;

        // Add svg to container
        const areaSVG = this.d3
            .select('.content')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = areaSVG
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xAxisCall = this.d3.axisBottom;
        const yAxisCall = this.d3.axisLeft;

        const xAxis = g
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`);

        const yAxis = g.append('g').attr('class', 'y axis');

        // https://coursehunters.net/course/vizualizacii-dannyh-s-d3-js
        yAxis
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', `rotate(-90)`)
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .attr('fill', '#5d6971')
            .text('Value');

        const defaultScale = this.d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, height]);

        this.randomValueSubscription = this.randomValue.subscribe(value => {
            this.data = [...this.data, value];
            areaSVG
                .selectAll('circle')
                .data([...this.data, value])
                .enter()
                .append('circle')
                .attr('r', 3)
                // tslint:disable-next-line: variable-name
                .attr('cx', (_d, i) => i + 10)
                .attr('cy', d => defaultScale(d))
                .attr('data', d => d);
        });
    }

    ngOnDestroy() {
        this.randomValueSubscription.unsubscribe();
    }
}
