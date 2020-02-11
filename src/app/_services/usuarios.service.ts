import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario, RespuestaObtenerUsuario, Respuesta } from '@/_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuariosService {


    constructor(private http: HttpClient) {

    }

    addUsuario(user: Usuario): Observable<Respuesta> {
        const datosUsuario = {
            id: user.id,
            cedula: user.cedula,
            nombres: user.nombres,
            primerApellido: user.primerApellido,
            segundoApellido: user.segundoApellido,
            telefono: '1234567',
            celular: user.celular,
            direccion: 'Dirección opcional de prueba',
            email: user.email,
            password: user.password,
        };
        if (datosUsuario.id === undefined) {
            datosUsuario.id = '';
            return this.http.post<Respuesta>(`${environment.apiUrl}/CuentaUsuario/CrearUsuario`, datosUsuario)
                .pipe(map(respuesta => {
                    return respuesta;
                }));
        } else {
            return null;
        }
    }
    obtenerUsuarios(): Observable<RespuestaObtenerUsuario> {

        return this.http.get<RespuestaObtenerUsuario>(`${environment.apiUrl}/CuentaUsuario/ObtenerUsuarios`)
            .pipe(map(respuesta => {
                return respuesta;
            }));
    }

    deleteUsuario(userId: string): Observable<Respuesta> {
        const datosUsuario = {
            usuarioId: userId
        };
        return this.http.post<Respuesta>(`${environment.apiUrl}/CuentaUsuario/DeleteUsuario`, datosUsuario)
         .pipe(map(respuesta => {
             return respuesta;
         }));
    }

    subirImage() {
        console.log('subir imagen store azure');
    }
}
