import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { FichaResolver } from '../resolvers/ficha.resolver';
import { GestionFComponent } from './ficha/gestion.component';

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
            }
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
