import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import {
    GeneratorValueService,
    RandomValueWithDate,
    getTimeInterval
} from '../../core/index';

@Component({
    selector: 'app-realtime-data',
    templateUrl: './realtime-data.component.html',
    styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit, OnDestroy {
    private d3: D3;
    private parentNativeElement: any;
    private generatorValueService: GeneratorValueService;
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
        if (this.parentNativeElement !== null) {
            this.d3ParentElement = this.d3.select(this.parentNativeElement);
        }

        const d3 = this.d3;
        const margin = { top: 80, right: 80, bottom: 80, left: 80 };
        const height = 800 - margin.top - margin.bottom;
        const width = window.innerWidth - margin.left - margin.right;

        const svg = d3
            .select('.content')
            .append('svg')
            .attr('width', width)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(0' + ',' + margin.top + ')')
            .attr('class', 'external-container');

        const innerContainer = d3
            .select('.external-container')
            .append('g')
            .attr('class', 'inner-container');

        // Add new Y coords
        const y = d3
            .scaleLinear()
            .domain([0, 1])
            .range([height, 0]);

        const initialTime = Date.now();

        this.randomValueSubscription = this.generatorValueService
            .getArrayWithRandomValue()
            .subscribe(randomValue => {
                const timeArray: number[] = randomValue.map(values => {
                    return getTimeInterval(initialTime, +values.time);
                });

                // Add new X coords
                const x = d3
                    .scaleLinear()
                    .domain([d3.min(timeArray), d3.max(timeArray)])
                    .range([0, width]);

                // Add line
                const line = d3
                    .line<RandomValueWithDate>()
                    .x(d => x(getTimeInterval(initialTime, +d.time)))
                    .y(d => y(d.value))
                    .curve(d3.curveMonotoneX);

                // Remove X coords
                svg.select('.xAxis').remove();

                // Remove old Y coords
                svg.select('.yAxis').remove();

                // Move x to left on new value
                innerContainer.attr(
                    'transform',
                    'translate(-' + margin.left + ', 0)'
                );

                svg.append('g')
                    .attr('class', 'xAxis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(d3.axisBottom(x));

                svg.append('g')
                    .attr('class', 'yAxis')
                    .call(d3.axisRight(y));

                // Remove old line
                svg.select('.path').remove();

                // Remove old dots
                svg.selectAll('.dot').remove();

                // Add new dots to char
                innerContainer
                    .selectAll('.dot')
                    .data<RandomValueWithDate>(randomValue)
                    .enter()
                    .append('circle')
                    .attr('class', 'dot')
                    .attr('cx', d => {
                        return x(getTimeInterval(initialTime, +d.time));
                    })
                    .attr('cy', d => {
                        return y(d.value);
                    })
                    .attr('r', 1.5)
                    .attr('fill', '#ffab00');

                // Add new line from array
                innerContainer
                    .append('path')
                    .datum(randomValue)
                    .attr('d', line)
                    .attr('fill', 'none')
                    .attr('stroke', '#ffab00')
                    .attr('stroke-width', 1)
                    .attr('class', 'path');
            });
    }

    ngOnDestroy() {
        this.randomValueSubscription.unsubscribe();
    }
}
