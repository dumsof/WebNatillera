import { User } from './user.model';
import { Mensaje } from './mensaje';
export class RespuestaObtenerUsuario {
    usuarios: User[];
    mensaje?: Mensaje;
    estadoTransaccion: boolean;

}
