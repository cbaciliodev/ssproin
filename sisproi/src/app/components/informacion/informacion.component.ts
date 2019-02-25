import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'informacion-base',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  @Input() public proyecto: any;

  constructor() { }

  ngOnInit() {
  }

  imprimir() {
    console.log(this.proyecto);
  }

}
