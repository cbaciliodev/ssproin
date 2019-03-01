import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { GestionFComponent } from './ficha/gestion.component';
import { GestionRComponent } from './registrada/gestion.component';

import { FichaResolver } from '../services/resolvers/ficha.resolver';
import { RegistradaComponent } from './registrada/registrada.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard', component: DashboardComponent, data: {
                    title: 'Proyectos', routes: [{ title: 'Proyectos' }, { title: 'tablero de control' }]
                }
            },
            {
                path: 'ficha', component: GestionFComponent, data: {
                    title: 'Gestión de fichas', routes: [{ title: 'Gestión de fichas' }]
                }
            },
            {
                path: 'ficha/registro', component: FichaComponent, resolve: { ficha: FichaResolver }, data: {
                    title: 'Ficha de proyecto', routes: [{ title: 'Gestión', link: '/ficha' }, { title: 'Ficha de proyecto' }]
                }
            },
            {
                path: 'registrada', component: GestionRComponent, data: {
                    title: 'Gestión de fichas registradas', routes: [{ title: 'Gestión de fichas registradas' }]
                }
            },
            {
                path: 'registrada/evaluacion', component: RegistradaComponent, resolve: { ficha: FichaResolver }, data: {
                    title: 'Ficha registrada', routes: [{ title: 'Gestión', link: '/registrada' }, { title: 'Ficha registrada' }]
                }
            }
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
