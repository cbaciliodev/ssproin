import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { CardProyectoComponent } from './card-proyecto/card-proyecto.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        SidebarComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        CardProyectoComponent,
    ],
    exports: [
        SidebarComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        CardProyectoComponent
    ]
})
export class SharedModule { }
