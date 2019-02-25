import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    ],
    exports: [
        SidebarComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent
    ]
})
export class SharedModule { }
