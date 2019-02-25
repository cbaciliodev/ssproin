import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', routes: [{ title: 'Dashboard'}, { title: 'Dashboard' }] } }
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
