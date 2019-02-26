import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  @Input() public proyecto: any;

  constructor() { }

  ngOnInit() {
  }

}
