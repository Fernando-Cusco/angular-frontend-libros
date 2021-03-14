import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../models/autor';
import { AutorService } from '../../../service/autor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
  providers: [DatePipe]
})
export class NuevoComponent implements OnInit {
  autor: Autor = new Autor()
  fecha: string = ""
  id;
  constructor(private service: AutorService, private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id != null) {
      this.findById(this.id);
    }
  }

  save() {
    this.autor.fechaNacimiento = this.datePipe.transform(this.fecha, 'dd-MM-yyyy')
        
    this.service.save(this.autor).subscribe(response => {
      console.log(response);
      
    })
  }

  private findById(id) {
    this.service.findById(id).subscribe(response => {
      this.autor = response
      this.fecha = response.fechaNacimiento
    })
  }

}
