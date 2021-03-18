import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage.service';
import Swal from 'sweetalert2'
@Injectable()
export class ErrorServer implements ErrorHandler{

    constructor(private injector: Injector, private service: LocalstorageService) {

    }

    handleError(error) {
        const router = this.injector.get(Router)
        if (error.status === 401 || error.status === 403) {
            this.showMessage()
            this.service.removeToken()
        }
        throw error;
    }

    showMessage() {
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'error'
          )
    }
}