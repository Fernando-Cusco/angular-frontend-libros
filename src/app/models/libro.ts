import { Autor } from './autor';
export class Libro {
    id: number;
    titulo: string;
    descripcion: string;
    numeroPaginas: number;
    autores: Autor[];
    stock: number;
    imagen: string;
    estado: boolean;
}
