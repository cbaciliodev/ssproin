import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { GestionFComponent } from './ficha/gestion.component';
import { GestionRComponent } from './registrada/gestion.component';
import { LoginGuardGuard } from '../services/service.index';

import { FichaResolver } from '../services/resolvers/ficha.resolver';
import { RegistradaComponent } from './registrada/registrada.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard', component: DashboardComponent, data: {
                    title: 'Inicio', routes: [{ title: 'Inicio' }, { title: 'Cuadro general' }]
                }
            },
            {
                path: 'ficha', component: GestionFComponent, data: {
                    title: 'Registros sectoriales', routes: [{ title: 'Gestión de fichas' }]
                }
            },
            {
                path: 'ficha/registro', component: FichaComponent, resolve: { ficha: FichaResolver }, data: {
                    title: 'Registro sectorial', routes: [{ title: 'Proyectos', link: '/ficha' }, { title: 'Registro sectorial' }]
                }
            },
            {
                path: 'registrada', component: GestionRComponent, data: {
                    title: 'Evaluación sectorial', routes: [{ title: 'Evaluación sectorial' }]
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
