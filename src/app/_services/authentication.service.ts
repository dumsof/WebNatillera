import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, RespuestaLogueo } from '@/_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<RespuestaLogueo>;
    public currentUser: Observable<RespuestaLogueo>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<RespuestaLogueo>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): RespuestaLogueo {
        return this.currentUserSubject.value;
    }

    login(user: User) {
        const datosUsuario = {
            email: user.userName,
            password: user.password
        };
        return this.http.post<RespuestaLogueo>(`${environment.apiUrl}/CuentaUsuario/Logueo`, datosUsuario)
            .pipe(map(respuesta => {
                if (!respuesta.estadoTransaccion) {
                    console.log('El usuario no existe :', respuesta);
                    return respuesta;
                }
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(respuesta));
                this.currentUserSubject.next(respuesta);
                return respuesta;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
