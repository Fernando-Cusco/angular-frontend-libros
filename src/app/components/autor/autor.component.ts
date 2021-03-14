import { Component, OnInit } from '@angular/core';
import { Autor } from '../../models/autor';
import { AutorService } from '../../service/autor.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  autores: Autor[] = []
  constructor(private service: AutorService) { }

  ngOnInit(): void {
    
    this.service.all().subscribe(response => {
      this.autores = response
    })
  }



}
