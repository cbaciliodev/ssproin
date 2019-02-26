import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'informacion-base',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  @Input() public proyecto: any;
  @ViewChild('gmap') gmapElement: ElementRef;

  private map: google.maps.Map;
  private marker: google.maps.Marker;

  constructor() { }

  ngOnInit() {
  }

}
