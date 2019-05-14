import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { GestionFComponent } from './ficha/gestion.component';
import { GestionRComponent } from './registrada/gestion.component';
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { FichaResolver } from '../services/resolvers/ficha.resolver';
import { RegistradaComponent } from './registrada/registrada.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SignupComponent } from './usuario/signup.component';
import { GestionPComponent } from './productiva/gestion.component';
import { ProductivaComponent } from './productiva/productiva.component';
import { ProductivaResolver } from '../services/resolvers/productiva.resolver';
import { NopagefoundComponent } from '../components/shared/nopagefound/nopagefound.component';
import { DocPolSectComponent } from './doc-pol-sect/doc-pol-sect.component';
import { ProfileComponent } from './profile/profile.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AppPerfilComponent } from './perfil/app-perfil/app-perfil.component';
import { ListProyectosComponent } from './list-proyectos/list-proyectos.component';
import { GisComponent } from './gis/gis.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: {
                    title: 'Inicio', routes: [{ title: 'Inicio' }, { title: 'Cuadro general' }]
                }
            },
            { path: 'ficha', component: GestionFComponent, data: {
                    title: 'Registros sectoriales', routes: [{ title: 'Gestión de fichas' }]
                }
            },
            { path: 'list_fichas', component: ListProyectosComponent, data: {
                    title: 'Proyectos', routes: [{ title: 'Listado de proyectos' }]
                }
            },
            { path: 'ficha/registro', component: FichaComponent, resolve: { ficha: FichaResolver }, data: {
                    title: 'Registro sectorial', routes: [{ title: 'Proyectos', link: '/ficha' }, { title: 'Registro sectorial' }]
                }
            },
            { path: 'registrada/ver', component: FichaComponent, resolve: { ficha: FichaResolver }, data: {
                    title: 'Consideraciones', routes: [{ title: 'Consideraciones', link: '/registrada' } ]
                }
            },
            { path: 'registrada', component: GestionRComponent, data: {
                    title: 'Consideraciones sectoriales', routes: [{ title: 'Consideracion sectorial' }]
                }
            },
            { path: 'registrada/evaluacion', component: RegistradaComponent, resolve: { ficha: FichaResolver }, data: {
                    title: 'Ficha registrada', routes: [{ title: 'Gestión', link: '/registrada' }, { title: 'Ficha registrada' }]
                }
            },
            { path: 'productiva', component: GestionPComponent, data: {
                    title: 'Minería', routes: [{ title: 'Minería' }]
                }
            },
            { path: 'productiva/registro', component: ProductivaComponent, resolve: { productiva: ProductivaResolver }, data: {
                    title: 'Minería', routes: [{ title: 'proyectos productivos', link: '/productiva' }, { title: 'Registro de productiva' }]
                }
            },
            { path: 'usuario',canActivate: [AdminGuard], component: UsuarioComponent, data: {
                    title: 'Usuarios'
                }
            },
            { path: 'signup', component: SignupComponent, data: {
                    title: 'Registro'
                }
            },
            { path: 'profile', component: ProfileComponent, data: {
                    title: 'Profile', routes: [{ title: 'Perfil de usuario'  }]
                }
            },
            { path: 'psectorial', component: DocPolSectComponent, data: {
                    title: 'Documento de Política Sectorial', routes: [{ title: 'política sectorial' }]
                }
            },
            // Páginas por desarrollar
            { path: 'mapas', component: GisComponent, data: {
                    title: '', routes: [{ title: '' }]
                }
            },
            { path: 'perfil', component: PerfilComponent, data: {
                    title: 'Perfiles', routes: [{ title: 'perfiles' }]
                }
            },
            { path: 'addperfil', component: AppPerfilComponent, data: {
                    title: 'Perfil', routes: [{ title: 'perfil' }]
                }
            }
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
