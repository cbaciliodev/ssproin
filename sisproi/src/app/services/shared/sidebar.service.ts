import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    { titulo: 'Inicio', icono: 'mdi mdi-home-outline', url: '/dashboard' },
    {
      titulo: 'Gestión',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Ficha de proyecto', url: '/ficha' },
        { titulo: 'Fichas registradas', url: '/registrada' }
      ]
    }
  ];

  constructor() { }
}
