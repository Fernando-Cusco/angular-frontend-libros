import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorComponent } from './components/autor/autor.component';
import { LibroComponent } from './components/libro/libro.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { NuevoComponent } from './components/autor/nuevo/nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NuevolibroComponent } from './components/libro/nuevolibro/nuevolibro.component';
import { DetallelibroComponent } from './components/libro/detallelibro/detallelibro.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AutorService } from './service/autor.service';
import { LibroService } from './service/libro.service';
import { ImagenService } from './service/imagen.service';
@NgModule({
  declarations: [
    AppComponent,
    AutorComponent,
    LibroComponent,
    HeaderComponent,
    NuevoComponent,
    NuevolibroComponent,
    DetallelibroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    AutorService,
    LibroService,
    ImagenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
