import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario :boolean;
  User;
  _id;
  constructor( public _sidebar: SidebarService ) { }

  ngOnInit() {
   
  this.User = JSON.parse(localStorage.getItem('usuario'));
  this._id =localStorage.getItem('id');

   if(this.User.perfil=='Usuario'){
    this.usuario =true;
    }else{
      this.usuario =false;
    } 
  }

}
