import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from '../components/utils/response';
@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private url: String = environment.api
  private httpHeaders = new HttpHeaders({ "Content-Type": "multipart/form-data" })
  constructor(private http: HttpClient) { }

  saveImage(file: File):Observable<Response> {
    const data =  new FormData()
    data.append("file", file)
    
    return this.http.post<Response>(`${this.url}imagen/upload`, data).pipe(
      catchError(error => {
        console.log('Error al crear');
        return throwError(error)
      })
    )
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const data =  new FormData()
    data.append("file", file)
    const request = new HttpRequest('POST', `${this.url}imagen/upload`, data, {
      reportProgress: true,
      responseType: 'json'
    })
    return this.http.request(request)
  }

}
