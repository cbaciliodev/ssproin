import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Proyectos', routes: [{ title: 'Proyectos' }, { title: 'tablero de control' }] } },
            { path: 'ficha', component: FichaComponent, data: { title: 'Ficha de proyecto', roputes: [{ title: 'Ficha de proyecto' }] } }
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
