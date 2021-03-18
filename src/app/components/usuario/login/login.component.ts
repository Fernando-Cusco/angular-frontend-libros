import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'
import { Credenciales } from '../../utils/credenciales';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../service/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario()
  credenciales: Credenciales = new Credenciales()
  credencialesForm: FormGroup

  constructor(private fb: FormBuilder, private service: UsuarioService, private router: Router, private localstorage: LocalstorageService) { }

  ngOnInit(): void {
    if (this.localstorage.tokenValid()) {
      this.router.navigate(['libro']);
    }
    this.credencialesForm =  this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.credenciales.email = this.credencialesForm.value['email']
    this.credenciales.password = this.credencialesForm.value['password']
    this.service.login(this.credenciales).subscribe(response => {
      this.usuario = response
      if (this.usuario.correctLogin) {
        this.notification(`Bienvenido, ${this.usuario.nombres}`)
        this.localstorage.saveToken(this.usuario.token)
        this.router.navigate(['libro']);
      } else {
        this.notification('Datos incorrectos')
        
      }
    }, error => {
      console.log('error', error);
      
    })
  }

  notification(mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000
    })
  }

  registrase() {
    this.router.navigate(['/usuario/registro'])
  }

}
