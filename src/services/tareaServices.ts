import { Tarea } from "../models/tarea";

import { EstadoTarea } from "../models/estados";

// Creamos un namespace para organizar las funciones relacionadas con la gestion de tareas
export namespace TareaService {

    const tareas: Tarea[] = [];

    export function agregarTarea(titulo: string, descripcion?: string) {
        const tarea = new Tarea(titulo, descripcion);
        tareas.push(tarea);
    }

    export function obtenerTareas(): Tarea[] {
        return tareas;
    }

    export function filtrarTareasPorEstado(estado: EstadoTarea): Tarea[] {
        return tareas.filter(tarea => tarea.estado === estado);6
    }

    export function cambiarEstado(titulo: string, nuevoEstado: EstadoTarea) {
        const tarea = tareas.find(t => t.titulo === titulo);
        if (tarea) {
            tarea.estado = nuevoEstado;
        } else {
            console.log(`Tarea con titulo "${titulo}" no encontrada`);
        }
    }

    export function eliminarTareasCompletadas() {
        tareas.forEach((tarea, index) => {
            if (tarea.estado === EstadoTarea.Completada) {
                tareas.splice(index, 1);
            }
        });
    }
}