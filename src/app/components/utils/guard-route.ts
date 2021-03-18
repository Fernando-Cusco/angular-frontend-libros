import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalstorageService } from '../../service/localstorage.service';
import Swal from 'sweetalert2'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private service: LocalstorageService, private router: Router) {}

    canActivate(): boolean {
        if(this.service.tokenValid()) {return true}
        this.showMessage()
        this.router.navigate(['/'])
        return false
    }

    showMessage() {
        Swal.fire(
            'Oops!',
            'Expiro la sesión',
            'error'
          )
    }
}