import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTE } from './pages.routes';
import { FichaComponent } from './ficha/ficha.component';
import { NgxPaginationComponent } from '../components/ngx-pagination/ngx-pagination.component';
import { InformacionComponent } from '../components/informacion/informacion.component';
import { VerificacionComponent } from '../components/verificacion/verificacion.component';
import { DetallePyComponent } from '../components/detalle-py/detalle-py.component';
import { BulletComponent } from '../components/bullet/bullet.component';
import { MapaUploadComponent } from '../components/mapa-upload/mapa-upload.component';
import { GestionFComponent } from './ficha/gestion.component';
import { RegistradaComponent } from './registrada/registrada.component';
import { GestionRComponent } from './registrada/gestion.component';

// Apis externas
import { FileUploadModule } from 'ng2-file-upload';
import { MapaUpload2Component } from '../components/mapa-upload.2/mapa-upload-2.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SignupComponent } from './usuario/signup.component';
import { ProductivaComponent } from './productiva/productiva.component';
import { GestionPComponent } from './productiva/gestion.component';
import { CsvModule } from '@ctrl/ngx-csv';
import { DocPolSectComponent } from './doc-pol-sect/doc-pol-sect.component';
import { ProfileComponent } from './profile/profile.component';
import { Profile01Component } from './profile/profile01.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AppPerfilComponent } from './perfil/app-perfil/app-perfil.component';
import { ListProyectosComponent } from './list-proyectos/list-proyectos.component';
import { GisComponent } from './gis/gis.component';
import { BarcharComponent } from '../components/barchar/barchar.component';
import { ChartsModule } from 'ng2-charts';
import { ProyectosProductivosComponent } from './productiva/proyectos-productivos/proyectos-productivos.component';
import { GestorProductivosComponent } from './productiva/proyectos-productivos/gestor-productivos.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        FichaComponent,
        NgxPaginationComponent,
        InformacionComponent,
        VerificacionComponent,
        DetallePyComponent,
        BulletComponent,
        MapaUploadComponent,
        MapaUpload2Component,
        GestionFComponent,
        RegistradaComponent,
        GestionRComponent,
        UsuarioComponent,
        SignupComponent,
        ProductivaComponent,
        GestionPComponent,
        DocPolSectComponent,
        ProfileComponent,
        Profile01Component,
        PerfilComponent,
        AppPerfilComponent,
        ListProyectosComponent,
        GisComponent,
        BarcharComponent,
        ProyectosProductivosComponent,
        GestorProductivosComponent
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
        FileUploadModule,
        CsvModule,
        PAGES_ROUTE,
        ChartsModule
    ]
})
export class PagesModule {}
