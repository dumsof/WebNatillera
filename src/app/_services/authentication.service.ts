import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, RespuestaLogueo, RespuestaObtenerUsuario, Respuesta } from '@/_models';
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
                //opcional mientras se guarda la fecha de expiracion del servicio
                this.guardarFechaExpiracionToken();
                return respuesta;
            }));
    }

    estaAutenticado(): boolean {
        //TODO: se debe programar en esta parte cuando el usuario tiene permiso en alguna ruta;


        let respuestaToken: RespuestaLogueo;
        respuestaToken = JSON.parse(window.localStorage.getItem('currentUser'));

        if (respuestaToken) {

            /* se obtiene la fecha en la cual expira el token y se realiza la validacion para saber si este expiro */
            //const expira = Number(respuestaToken.expiracion);

            //temporarl miestras se resueve el problema de la fecha expiracion del backend.
            const expira = Number(localStorage.getItem('expiraToken'));

            const fechaExpira = new Date();
            fechaExpira.setTime(expira);
            if (new Date() > fechaExpira) {
                this.logout();
                return false;
            }
            return true;
        }

        return false;
    }

    private guardarFechaExpiracionToken() {
        let hoy = new Date();
        /* 3600, esto equivale a 1 hora que es el tiempo de expiracion que envia el servicio,
        se trabaja con una constante debido que siempre envia un 3600 una hora */
        hoy.setSeconds(3600);
        /* almacenar la fecha a futuro la cual expira el token depues que se creo seria una hora */
        localStorage.setItem('expiraToken', hoy.getTime().toString());
    }


    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        localStorage.removeItem('expiraToken');
    }
}
