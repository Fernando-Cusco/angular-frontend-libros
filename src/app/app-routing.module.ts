import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './components/autor/autor.component';
import { NuevoComponent } from './components/autor/nuevo/nuevo.component';
import { LibroComponent } from './components/libro/libro.component';
import { DetallelibroComponent } from './components/libro/detallelibro/detallelibro.component';
import { NuevolibroComponent } from './components/libro/nuevolibro/nuevolibro.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';
import { AuthGuard } from './components/utils/guard-route';


const routes: Routes = [
  
  {
    path: 'autor', component: AutorComponent, canActivate: [AuthGuard]
  },
  {
    path: 'nuevo', component: NuevoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'nuevo/:id', component: NuevoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'libro', component: LibroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'libro/:id', component: DetallelibroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'nuevolibro', component: NuevolibroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'nuevolibro/:id', component: NuevolibroComponent, canActivate: [AuthGuard]
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'usuario/login', component: LoginComponent
  },
  {
    path: 'usuario/registro', component: RegistroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
