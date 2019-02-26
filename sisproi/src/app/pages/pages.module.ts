import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTE } from './pages.routes';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { InformacionComponent } from '../components/informacion/informacion.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProyectoComponent,
        InformacionComponent
    ],
    exports: [
        DashboardComponent,
        ProyectoComponent,
        InformacionComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PAGES_ROUTE
    ]
})
export class PagesModule {}
