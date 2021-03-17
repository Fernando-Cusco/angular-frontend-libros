import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Libro } from '../models/libro';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private url: string = environment.api
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json','Authorization': this.localstorage.getToken()})


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalstorageService) { }

  
  all():Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.url}libro/all`, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al listar los libros');
        return throwError(error)
      })
    )
  }

  findById(id: number):Observable<Libro>{
    return this.http.get<Libro>(`${this.url}libro/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al buscar el libro');
        this.router.navigate(['libro'])
        return throwError(error)
      })
    )
  }

  save(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.url}libro`, libro, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al guardar el libro');
        return throwError(error)
      })
    )
  }

}
