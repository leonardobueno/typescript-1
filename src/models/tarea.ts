//importamos EstadoTarea para poder usarlo como tipo en la propiedad 'estado'
import { EstadoTarea } from './estados';

// Importar el decorador 'obligatorio' para aplicarlo en la clase
import { obligatorio } from '../utils/validadores';

// Definimos la clase tarea que va representar una tarea individual en la app
export class Tarea {
    // usamos el decorador '@obligatorio' para asegurar que el titulo sea siempre proporcionado
    //@obligatorio
    titulo: string;

    // Definimos la propiedad 'descripcion' que no es obligatoria
    descripcion: string;

    estado: EstadoTarea;

    // Constructor de la clase 'Tarea' que va a inicializar el titulo, la descripcion y el estado
    constructor(titulo: string, descripcion: string = '', estado: EstadoTarea = EstadoTarea.Pendiente) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}
