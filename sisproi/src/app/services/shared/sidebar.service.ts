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
        { titulo: 'Listado general', url: '/list_fichas' },
        { titulo: 'Registros', url: '/ficha' },
        { titulo: 'Evaluación', url: '/registrada' },
      ]
    },
    { titulo: 'Proyectos productivos', icono: 'mdi mdi-ferry', submenu: [ { titulo: 'Minería', url: '/productiva' } ]},
    { titulo: 'Política sectorial', icono: 'mdi mdi-highway', url: '/psectorial' },
    { titulo: 'Mapas', icono: 'mdi mdi-map-marker-radius', url: '/mapas' },
    
    /*
    {
      titulo: 'Administración',
      icono: 'mdi mdi-account-circle',
      submenu: [
        { titulo: 'Usuarios', url: '/usuario' },
        { titulo: 'Registrar', url: '/signup' }
       ]
  }*/
    
  ];

  constructor() {
  }
}
