import * as readline from 'readline';
import { TareaService } from './services/tareaServices';
import { EstadoTarea } from './models/estados';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function mostrarMenu() {
    console.log("\n---Menu de tareas---");
    console.log("1. Agregar una tarea");
    console.log("2. Ver todas las tareas");
    console.log("3. Filtrar tareas por estado");
    console.log("4. Cambiar el estado de una tarea");
    console.log("5. Eliminar tareas completadas");
    console.log("6. Salir\n");
    rl.question('Seleccione una opción: ', opcion => {
        manejarOpcion(opcion);
    })
}

function manejarOpcion(opcion: string) {
    switch (opcion) {
        case "1":
            agregarTarea();
            break;
        case "2":
            verTareas();
            break;
        case "3":
            filtrarTareas();
            break;
        case "4":
            cambiarEstadoTarea();
            break;
        case "5":
            eliminarTareasCompletadas();
            break;
        case "6":
            console.log("Gracias por utilizar el gestor de tareas. Hasta Pronto!!.")
            rl.close();
            break;
        default:
            console.log("Opción no válida. Intente nuevamente.")
            mostrarMenu();
    }

}

function agregarTarea() {
    rl.question('Título de la tarea: ', titulo => {
        rl.question('Descripcion de la tarea (opcional): ', descripcion => {
            TareaService.agregarTarea(titulo, descripcion);
            console.log("Tarea agregada correctamente.");
            mostrarMenu();
        });
    });
}

function verTareas() {
    const tareas = TareaService.obtenerTareas();
    console.log("\n --- Lista de tareas ---");
    tareas.forEach((t, index) => console.log(`${index + 1}. Título: ${t.titulo}, Descripción: ${t.descripcion}, Estado: ${t.estado}`));
    mostrarMenu();
}

function cambiarEstadoTarea() {
    rl.question('Título de la tarea a modificar: ', titulo => {
        rl.question('Nuevo estado (Pendiente, En progreso, Completada, Cancelada): ', nuevoEstado => {
            const estadoTarea = EstadoTarea[nuevoEstado as keyof typeof EstadoTarea];
            if (estadoTarea) {
                TareaService.cambiarEstado(titulo, estadoTarea);
                console.log("Estado de tarea cambiado correctamente");
            } else {
                console.log("Estado no válido");
            }
            mostrarMenu();
        });
    });

}

function eliminarTareasCompletadas() {
    TareaService.eliminarTareasCompletadas();
    console.log("Tareas eliminadas correctamente");
    mostrarMenu();
}

function filtrarTareas() {
    rl.question('Ingrese el estado para filtrar (Pendiente, En progreso, Completada, Cancelada): ', estado => {
        const estadoTarea = EstadoTarea[estado as keyof typeof EstadoTarea];
        if (estadoTarea) {
            const tareasFiltradas = TareaService.filtrarTareasPorEstado(estadoTarea);
            console.log(`\n --- Tareas en estado ${estadoTarea} ---`);
            tareasFiltradas.forEach((t, index) => console.log(`${index + 1}. Título: ${t.titulo}, Descripción: ${t.descripcion}, Estado: ${t.estado}`));
        } else {
            console.log("Estado no válido");
        }
        mostrarMenu();
    });
}

mostrarMenu();