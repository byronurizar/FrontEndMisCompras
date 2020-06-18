import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Components
import { LandingComponent } from './landing/landing.component';
import { ContentComponent } from './layouts/content/content.component';
// Routes
import { content } from "./shared/routes/content.routes";
import { IngresoSistemaComponent } from './misCompras/ingreso-sistema/ingreso-sistema.component';
import { RegistroComponent } from './misCompras/registro/registro.component';
import { InicioComponent } from './misCompras/inicio/inicio.component';
import { NuevoUsuarioComponent } from './misCompras/nuevo-usuario/nuevo-usuario.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    component: ContentComponent,
    children: content
  },
  {
    path:'login',
    component:IngresoSistemaComponent
  },
  {
    path:'registrarse',
    component:RegistroComponent
  },
  {
    path:'nuevousuario',
    component:NuevoUsuarioComponent
  },
  {
    path:'inicio',
    component:InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

