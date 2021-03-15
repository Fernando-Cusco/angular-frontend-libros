import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'
import { Credenciales } from '../../utils/credenciales';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../models/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario()
  credenciales: Credenciales = new Credenciales()
  credencialesForm: FormGroup

  constructor(private fb: FormBuilder, private service: UsuarioService) { }

  ngOnInit(): void {
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
      console.log(this.usuario);
    }, error => {
      console.log('error', error);
      
    })
  }

}
