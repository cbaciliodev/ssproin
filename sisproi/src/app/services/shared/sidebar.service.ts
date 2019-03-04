import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    { titulo: 'Inicio', icono: 'mdi mdi-home-outline', url: '/dashboard' },
    {
      titulo: 'Proyectos',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Registros sectoriales', url: '/ficha' },
        { titulo: 'Evaluación sectorial', url: '/registrada' }
      ]
    }
  ];

  constructor() { }
}
