import { Component, OnInit, AfterViewInit } from '@angular/core';

declare function initMap();

@Component({
  selector: 'app-mapa-upload',
  templateUrl: './mapa-upload.component.html',
  styleUrls: ['./mapa-upload.component.css']
})
export class MapaUploadComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
    initMap();
  }

  constructor() { }

  ngOnInit() {
    
  }

}
