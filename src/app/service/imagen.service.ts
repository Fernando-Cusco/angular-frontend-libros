import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from '../components/utils/response';
import { LocalstorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private url: String = environment.api
  private httpHeaders = new HttpHeaders({'Authorization': this.localstorage.getToken()})
  constructor(private http: HttpClient, private localstorage: LocalstorageService) { }

  saveImage(file: File):Observable<Response> {
    const data =  new FormData()
    data.append("file", file)
    
    return this.http.post<Response>(`${this.url}imagen/upload`, data, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al crear');
        return throwError(error)
      })
    )
  }

  getImage(nombre: string): string {
    return ""
  }

}
