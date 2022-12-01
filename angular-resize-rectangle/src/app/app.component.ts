import { SvgService } from './services/svg-service';
import { SvgRectangleDimensions } from './models/SvgRectangleDimensions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public dimensions: SvgRectangleDimensions;
  public loaded = false;
  constructor(public svgService: SvgService) {}

  ngOnInit() {
    this.loadDimensions();
  }

  loadDimensions() {
    this.svgService.getDimensions().subscribe((data: SvgRectangleDimensions) => {
      this.dimensions = data;
      this.loaded = true;
    });
  }
}
