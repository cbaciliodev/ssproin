import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( public router: Router ) { }

  ngOnInit() {
  }
  cerrarSecion(){
  
    localStorage.clear();
   this.router.navigate( ['/login'] );
    console.log('LImpio')
    

  }

}
