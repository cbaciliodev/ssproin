import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-barchar',
  templateUrl: './barchar.component.html',
  styles: []
})
export class BarcharComponent implements OnInit {

  @Input() chartLabels: string[] = [];
  @Input() chartData: Array<any> = [];
  @Input() chartType: string = 'bar';

  constructor() { }

  ngOnInit() {
  }


}
