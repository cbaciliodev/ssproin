import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagesModule } from './pages/pages.module';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

// Local
import { registerLocaleData } from '@angular/common';
import localePe from '@angular/common/locales/es-PE';
registerLocaleData(localePe, 'es-PE');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTES
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
