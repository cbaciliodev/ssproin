import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { GestionFComponent } from './ficha/gestion.component';
import { GestionRComponent } from './registrada/gestion.component';
import { LoginGuardGuard } from '../services/service.index';

import { FichaResolver } from '../services/resolvers/ficha.resolver';
import { RegistradaComponent } from './registrada/registrada.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SignupComponent } from './usuario/signup.component';

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
            },
            {
                path: 'usuario', component: UsuarioComponent, data: {
                    title: 'Usuarios', routes: [{ title: 'Usuarios' }, { title: 'Usuarios' }]
                }
            },
            {
                path: 'signup', component: SignupComponent, data: {
                    title: 'Signup', routes: [{ title: 'Signup' }, { title: 'Signup' }]
                }
            }
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
