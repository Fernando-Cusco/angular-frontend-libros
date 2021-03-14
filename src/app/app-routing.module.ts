import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './components/autor/autor.component';
import { NuevoComponent } from './components/autor/nuevo/nuevo.component';
import { LibroComponent } from './components/libro/libro.component';
import { DetallelibroComponent } from './components/libro/detallelibro/detallelibro.component';
import { NuevolibroComponent } from './components/libro/nuevolibro/nuevolibro.component';

const routes: Routes = [
  {
    path: '', component: AutorComponent
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
