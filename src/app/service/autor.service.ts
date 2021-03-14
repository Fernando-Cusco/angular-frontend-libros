import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Autor } from '../models/autor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private url: string = environment.api
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }


  all():Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.url}autor/all`).pipe(
      catchError(error => {
        console.log('Error para listar');
        return throwError(error)
      })
    )
  }

  findById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.url}autor/${id}`).pipe(
      catchError(error => {
        console.log('Error al buscar');
        return throwError(error)
      })
    )
  }

  save(autor: Autor):Observable<Autor> {
    return this.http.post<Autor>(`${this.url}autor`, autor, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al crear');
        return throwError(error)
      })
    )
  }
}
