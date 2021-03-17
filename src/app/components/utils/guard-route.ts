import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalstorageService } from '../../service/localstorage.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private service: LocalstorageService, private router: Router) {}

    canActivate(): boolean {
        if(this.service.tokenValid()) {return true}
        this.router.navigate(['/'])
        return false
    }
}