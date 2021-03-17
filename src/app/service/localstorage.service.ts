import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Token } from '../models/token';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getTokenExpire(): Date {
    const decode: Token = jwt_decode(this.getToken())
    if (decode.exp === null || decode.exp === undefined) return null
    const exp =  new Date(0)
    exp.setUTCSeconds(decode.exp)
    return exp
  }

  tokenValid(): boolean {
    const date =  this.getTokenExpire()
    if (date === null || date === undefined) return false
    if (date.valueOf() > new Date().valueOf()) return true

  }

}
