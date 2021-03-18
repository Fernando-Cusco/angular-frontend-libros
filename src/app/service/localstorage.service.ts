import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Token } from '../models/token';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private router: Router) { }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined){
      return localStorage.getItem('token')
    }
    return ""
  }

  removeToken() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  getDecode(): Token {
    return jwt_decode(this.getToken())
  }

  getTokenExpire(): Date {
    const token: string = this.getToken()
    if (token !== "") {
      const decode: Token = jwt_decode(token)
      if (decode.exp === null || decode.exp === undefined) return null
      const exp =  new Date(0)
      exp.setUTCSeconds(decode.exp)
      return exp
    }
    return null
  }

  tokenValid(): boolean {
    const date =  this.getTokenExpire()
    if (date === null || date === undefined){
      this.removeToken()
      this.router.navigate(['/usuario/login'])
      return false
    }
    if (date.valueOf() > new Date().valueOf()) return true

  }

}
