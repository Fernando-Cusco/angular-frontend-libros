import { Rol } from './rol';
export class Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    identificacion: string;
    fechaNacimiento: Date;
    email: string;
    password: string;
    estado: string;
    createAt: Date;
    correctLogin: boolean;
    roles: Rol[];
    token: string;
}