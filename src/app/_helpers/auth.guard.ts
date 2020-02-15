import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(): boolean {
        /* el sistema valida que si esta autenticado permita seguir a la pagina a la cual se 
        le agrego la condicion del canactivate en el archivo de las rutas, sino el sistema direcciona al login */
        if (this.authenticationService.estaAutenticado()) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}

