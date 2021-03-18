import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { LocalstorageService } from '../../../service/localstorage.service';
import { Usuario } from '../../../models/usuario';
import { Token } from '../../../models/token';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = new Usuario()
  token: Token = new Token()
  constructor(private service: LocalstorageService,private serviceUser: UsuarioService) { }

  ngOnInit(): void {
    this.token = this.service.getDecode()
    this.serviceUser.perfil(this.token.jti).subscribe(response => {
      this.usuario = response
      console.log(this.usuario);
    })
  }

}
