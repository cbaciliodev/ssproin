import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() { }

  ngOnDestroy() {
    localStorage.clear();
  }
}
