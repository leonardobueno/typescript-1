//Definimos un decorador llamado obligatorio
// este decorador asegura que el valor de una propiedad no sea undefined o vacio
export function obligatorio(target: any, key: string) {

    // guardar el valor inicial de la propiedad
    let valor = target[key];

    // Definimos un getter que simplemente nos devuelva el valor actual
    const getter = () => valor;

    // definimos un setter que verifica si el valor nuevo es valido (no está vacio)
    const setter = (nuevoValor: string) => {
        if (!nuevoValor) {
            throw new Error(`La propiedad '${key}' es obligatoria`);
        }
        valor = nuevoValor;
    };
    // Usamos esto para aplicar el getter y setter personalizados a la propiedad
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })

}