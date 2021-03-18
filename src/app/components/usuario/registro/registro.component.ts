import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2'
import { UsuarioService } from '../../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario = new Usuario()
  usuarioForm:FormGroup

  constructor(private fb: FormBuilder, private service: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.min(3)]],
      apellidos: ['', [Validators.required, Validators.min(3)]],
      identificacion: ['', [Validators.required, Validators.min(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]]
    })
  }

  onSubmit() {
    if (this.showErros()) {
      this.usuario.nombres = this.usuarioForm.value['nombres']
      this.usuario.apellidos = this.usuarioForm.value['apellidos']
      this.usuario.identificacion = this.usuarioForm.value['identificacion']
      this.usuario.email = this.usuarioForm.value['email']
      this.usuario.password = this.usuarioForm.value['password']
      
      console.log(this.usuario);
      
      this.service.registrar(this.usuario).subscribe(response => {
        if (response.id > 0 && response.id != null) {
          this.notification('Registro exitoso')
          this.router.navigate(['/usuario/login']);
        }
      })
    }
    
  }


  showErros()  {
    let campos = ['nombres', 'apellidos', 'identificacion', 'email', 'password']
    let mensajeErro = ''
    for(let i = 0; i < campos.length; i++) {
      if (this.usuarioForm.controls[campos[i]].invalid) {
        mensajeErro += campos[i]  + ', '
      }
    }
    if (this.usuarioForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops... los siguientes campos tiene error',
        text: mensajeErro
      })
      return false
    }
    return true
  }

  notification(mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 2000
    })
  }

  login() {
    this.router.navigate(['/usuario/login'])
  }

}
