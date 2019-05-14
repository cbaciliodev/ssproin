import { Component, OnInit, AfterViewInit } from '@angular/core';

declare function screen();

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styles: []
})
export class GisComponent implements OnInit, AfterViewInit {

  constructor( ) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    screen();
  }

}
