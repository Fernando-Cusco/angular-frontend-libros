import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './components/autor/autor.component';
import { NuevoComponent } from './components/autor/nuevo/nuevo.component';
import { LibroComponent } from './components/libro/libro.component';
import { DetallelibroComponent } from './components/libro/detallelibro/detallelibro.component';
import { NuevolibroComponent } from './components/libro/nuevolibro/nuevolibro.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';

const routes: Routes = [
  
  {
    path: 'autor', component: AutorComponent,
  },
  {
    path: 'nuevo', component: NuevoComponent,
  },
  {
    path: 'nuevo/:id', component: NuevoComponent,
  },
  {
    path: 'libro', component: LibroComponent,
  },
  {
    path: 'libro/:id', component: DetallelibroComponent,
  },
  {
    path: 'nuevolibro', component: NuevolibroComponent,
  },
  {
    path: 'nuevolibro/:id', component: NuevolibroComponent,
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
