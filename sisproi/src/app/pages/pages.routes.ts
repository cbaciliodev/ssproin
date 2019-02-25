import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', routes: [{ title: 'Dashboard' }, { title: 'Dashboard' }] } },
            { path: 'proyecto', component: ProyectoComponent, data: { title: 'Ficha de proyecto', roputes: [{ title: 'Ficha de proyecto' }] } }
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
