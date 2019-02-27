import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from './services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  constructor( public _ajustes: SettingsService ) { }
  
  ngOnInit(){
    init_plugins();
  }

  ngOnDestroy() {
    localStorage.clear();
  }
}
