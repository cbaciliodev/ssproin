import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-py',
  templateUrl: './detalle-py.component.html',
  styleUrls: ['./detalle-py.component.css']
})
export class DetallePyComponent implements OnInit {

  @Input() titulo: string;

  constructor() { }

  ngOnInit() {
  }

}
