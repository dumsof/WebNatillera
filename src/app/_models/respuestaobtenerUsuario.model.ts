import { Mensaje } from './mensaje.models';
import { Usuario } from './usuario.model';
export class RespuestaObtenerUsuario {
    usuarios: Usuario[];
    mensaje?: Mensaje;
    estadoTransaccion: boolean;

}
