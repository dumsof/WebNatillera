import { Mensaje } from './mensaje.models';
import { Usuario } from './usuario.model';
export class RespuestaLogueo {
    estadoTransaccion: boolean;
    usuario: Usuario;
    mensaje: Mensaje;
    token: string;
    fechaExpirationToken: string;
}
