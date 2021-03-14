import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Libro } from '../../../models/libro';
import { LibroService } from '../../../service/libro.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Autor } from '../../../models/autor';
import { AutorService } from '../../../service/autor.service';
import { ActivatedRoute } from '@angular/router';
import { ImagenService } from '../../../service/imagen.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-nuevolibro',
  templateUrl: './nuevolibro.component.html',
  styleUrls: ['./nuevolibro.component.css']
})
export class NuevolibroComponent implements OnInit {
  ngForm = new FormControl();
  
  autor: Autor = new Autor()
  libro: Libro = new Libro()
  autores: Autor[] = []
  autoresFilter: Observable<Autor[]>;
  autoresLibro: Autor[] = []
  id;
  progress = 0
  imagen: FileList;

  constructor(private imagenService: ImagenService,private service: LibroService, private serviceAutor: AutorService, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.serviceAutor.all().subscribe(response => {
      this.autores = response
      if (this.id !== null) {
        this.findById(this.id)
      }
    })

    this.autoresFilter = this.ngForm.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(clave => this._filter(clave))
    )
  }

  _filter(clave: string): Autor[] {
    if ( typeof(clave) == 'string') {  
      let res = []
      const format = clave.toLocaleLowerCase()
      this.autores.forEach(autor => {
        if (autor.nombres.toLocaleLowerCase().indexOf(format) === 0) {
        res.push(autor)
      }
    });
    
    return res;
    }
    return []
  }

  removerAutor(autor) {
    let index = this.autoresLibro.findIndex(a => a === autor)
    if (index !== -1) {
      this.autoresLibro.splice(index, 1)
    }
    
  }


  agregarAutor() {
    if ( this.ngForm.value !== '') {
      let autor = this.ngForm.value
      if (this.autoresLibro.length === 0) {
        this.autoresLibro.push(autor)
      } else {
        const ax =  this.autoresLibro.filter(a => a === autor)
        if (ax.length === 0) {
          this.autoresLibro.push(autor)
        }
        
      } 
    }
  }

  save() {
    if (this.autoresLibro.length != 0) {
      this.libro.autores = this.autoresLibro
      this.service.save(this.libro).subscribe(response => {
        console.log(response);
        
      })
    } else {
      console.log('no hay autores');
      
    }
  }

  displayFn(autor: Autor): string {
    return autor && autor.nombres ? autor.nombres: ''
  }

  private findById(id) {
    this.service.findById(id).subscribe(response => {
      this.libro = response
      this.autoresLibro = response.autores
      console.log(response, 'here');
      
    })
  }

  saveLibro(): Promise<any> {
    const file: File = this.imagen.item(0)
    if (this.autoresLibro.length != 0) {
      this.libro.autores = this.autoresLibro
      return new Promise((resolve, reject) => {
        this.imagenService.saveImage(file).subscribe(response => {
          if (response.estado === 'ok') {
            this.libro.imagen = response.codigo
            console.log('Libro', this.libro);
            
            this.service.save(this.libro).subscribe(response => {
              console.log(response);
            })
          } else {
            console.log('No se guardo el libro');
          }
        })
      })
    } else {
      console.log('no hay autores');
    }

  }

  subirArchivo(event) {
    this.imagen = event.target.files
  }


}
