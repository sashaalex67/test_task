import { SvgService } from './../services/svg-service';
import { SvgRectangleDimensions } from './../models/SvgRectangleDimensions';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-resizable-draggable',
  templateUrl: './resizable.component.svg',
  styleUrls: ['./resizable.component.scss'],
})
export class ResizableComponent implements OnInit, AfterViewInit {
  @Input('dimensions') public dimensions: SvgRectangleDimensions;
  public perimeter: number = 0;
  public updateDimensions = new SvgRectangleDimensions();
  constructor(public svgService: SvgService) {}

  ngOnInit() {
    this.perimeter = 2 * (+this.dimensions?.width + this.dimensions?.height);
  }

  ngAfterViewInit() {
    const svg = d3.select('svg');
    const self = this;
    const basicPer = this.perimeter;

    function zoomed(event: any) {
      const transform = event.transform;
      self.updateDimensions.height = Math.round(
        transform.k * self.dimensions.height
      );
      self.updateDimensions.width = Math.round(
        transform.k * self.dimensions.height
      );
      self.updateDimensions.top = self.dimensions.top;
      self.updateDimensions.left = self.dimensions.left;
      self.perimeter =
        2 * (self.updateDimensions.height + self.updateDimensions.width);
      svg.selectAll('g').attr('transform', transform);
    }

    function zoomEnd() {
      self.svgService.setDimensions(self.updateDimensions).subscribe(() => {});
    }

    const zoom = d3.zoom().on('zoom', zoomed).on('end', zoomEnd) as any;
    svg.call(zoom);
  }
}
