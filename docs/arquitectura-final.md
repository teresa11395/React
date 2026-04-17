# Arquitectura final — Módulo 3

## ¿Cómo TypeScript reduce errores respecto a JavaScript?

### Genéricos
`DataTable<T>` funciona con cualquier tipo de dato sin perder seguridad de tipos.
En JavaScript puro no sabrías qué propiedades tiene `T` hasta ejecutar el código.
Con TypeScript el compilador te avisa en el momento de escribir el código.

### Uniones Discriminadas
`EstadoMatricula` tiene tres estados posibles: ACTIVA, SUSPENDIDA y FINALIZADA.
En JavaScript podrías olvidarte de manejar un estado y no saberlo hasta que
el programa falle en producción. TypeScript te obliga a manejar todos los casos.

### El tipo `never`
Añadido en `generarReporte`, garantiza que si en el futuro se añade un nuevo
estado a `EstadoMatricula`, el compilador dará un error si no se maneja.
En JavaScript este error solo aparecería en tiempo de ejecución.

### Tipos de utilidad
`Partial<T>` en el estado de edición de `DataTable` permite que el usuario
edite una fila sin necesidad de rellenar todos los campos a la vez.
En JavaScript tendrías que gestionar esto manualmente sin ninguna garantía.

### Librerías externas con tipos
`date-fns` viene con tipos incluidos. La función `calcularDiasEntre` garantiza
que solo acepta objetos `Date` y devuelve un `number`.
En JavaScript podrías pasar un string sin que nadie te avisara.

## Bonus: DataTable<T> con ordenación

Se ha ampliado el componente `DataTable<T>` con la funcionalidad de ordenar
las columnas al hacer clic en su cabecera.

### Conceptos TypeScript aplicados:
- `type DireccionOrden = "asc" | "desc"` — tipo literal que solo permite
  dos valores posibles, evitando errores con strings arbitrarios.
- `keyof T` — garantiza que solo puedes ordenar por claves que existen
  en el tipo T. En JavaScript podrías pasar cualquier string sin error.
- `useState<keyof T | null>` — estado tipado que puede ser una clave de T
  o null si no hay columna seleccionada.