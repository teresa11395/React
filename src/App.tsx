import { DataTable } from './DataTable';
import { calcularDiasEntre } from './date-utils';

interface Estudiante {
  id: number;
  nombre: string;
  curso: string;
  nota: number;
}

const estudiantes: Estudiante[] = [
  { id: 1, nombre: "Ana García", curso: "Programación", nota: 9.2 },
  { id: 2, nombre: "Luis Martínez", curso: "Matemáticas", nota: 7.5 },
  { id: 3, nombre: "María López", curso: "Física", nota: 8.1 },
];

const columnas = [
  { cabecera: "Nombre", clave: "nombre" as const },
  { cabecera: "Curso", clave: "curso" as const },
  { cabecera: "Nota", clave: "nota" as const },
];

const fechaInicio = new Date("2024-01-01");
const fechaFin = new Date("2024-12-31");
const dias = calcularDiasEntre(fechaInicio, fechaFin);

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sistema Universitario</h1>
      <DataTable datos={estudiantes} columnas={columnas} />
      <p style={{ marginTop: "2rem" }}>
        Días del curso 2024: <strong>{dias} días</strong>
      </p>
    </div>
  );
}

export default App;