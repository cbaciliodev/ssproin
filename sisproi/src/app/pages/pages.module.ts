import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTE } from './pages.routes';
import { FichaComponent } from './ficha/ficha.component';
import { InformacionComponent } from '../components/informacion/informacion.component';
import { VerificacionComponent } from '../components/verificacion/verificacion.component';
import { DetallePyComponent } from '../components/detalle-py/detalle-py.component';
import { BulletComponent } from '../components/bullet/bullet.component';
import { MapaUploadComponent } from '../components/mapa-upload/mapa-upload.component';
import { GestionFComponent } from './ficha/gestion.component';
import { RegistradaComponent } from './registrada/registrada.component';
import { GestionRComponent } from './registrada/gestion.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        FichaComponent,
        InformacionComponent,
        VerificacionComponent,
        DetallePyComponent,
        BulletComponent,
        MapaUploadComponent,
        GestionFComponent,
        RegistradaComponent,
        GestionRComponent
    ],
    exports: [
        DashboardComponent,
        FichaComponent,
        InformacionComponent,
        VerificacionComponent,
        GestionFComponent,
        RegistradaComponent,
        GestionRComponent
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
