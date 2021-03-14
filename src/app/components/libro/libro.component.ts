import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibroService } from '../../service/libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  libros: Libro[] = []
  constructor(private service: LibroService) { }

  ngOnInit(): void {
    this.service.all().subscribe(response => {
      this.libros = response
      console.log(response);
    })
  }

}
