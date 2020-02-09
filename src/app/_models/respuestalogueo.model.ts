import { Mensaje } from './mensaje';
export class RespuestaLogueo {
    id: string;
    nombres: string;
    primerApellido: string;
    segundoapellido: string;
    direccion: string;
    telefono: string;
    celular: string;
    token: string;
    expiracion: string;
    estadoTransaccion: boolean;
    mensaje: Mensaje;
}
