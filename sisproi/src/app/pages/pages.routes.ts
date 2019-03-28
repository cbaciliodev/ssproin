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
import { GestionPComponent } from './productiva/gestion.component';
import { ProductivaComponent } from './productiva/productiva.component';
import { ProductivaResolver } from '../services/resolvers/productiva.resolver';

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
                path: 'registrada/ver', component: FichaComponent, resolve: { ficha: FichaResolver }, data: {
                    title: 'Evaluación sectorial', routes: [{ title: 'Evaluación', link: '/registrada' }, { title: 'Evaluación sectorial' }]
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
            },
            {
                path: 'productiva', component: GestionPComponent, data: {
                    title: 'Fichas productivas', routes: [{ title: 'Fichas productivas' }]
                }
            },
            {
                path: 'productiva/registro', component: ProductivaComponent, resolve: { productiva: ProductivaResolver }, data: {
                    title: 'Ficha productiva', routes: [{ title: 'Gestión', link: '/productiva' }, { title: 'Registro de productiva' }]
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
