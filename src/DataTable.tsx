import { useState } from "react";

// ================================
// TIPOS
// ================================

interface ColumnaTabla<T> {
  cabecera: string;
  clave: keyof T;
}

interface DataTableProps<T> {
  datos: T[];
  columnas: ColumnaTabla<T>[];
}

type DireccionOrden = "asc" | "desc";

// ================================
// COMPONENTE GENÉRICO DataTable<T>
// ================================

export function DataTable<T extends { id: string | number }>({
  datos,
  columnas,
}: DataTableProps<T>) {
  const [filaEditando, setFilaEditando] = useState<Partial<T> | null>(null);
  const [columnaOrden, setColumnaOrden] = useState<keyof T | null>(null);
  const [direccion, setDireccion] = useState<DireccionOrden>("asc");

  // Función para ordenar al hacer clic en cabecera
  function handleOrden(clave: keyof T) {
    if (columnaOrden === clave) {
      setDireccion(direccion === "asc" ? "desc" : "asc");
    } else {
      setColumnaOrden(clave);
      setDireccion("asc");
    }
  }

  // Ordenar los datos según la columna seleccionada
  const datosOrdenados = [...datos].sort((a, b) => {
    if (!columnaOrden) return 0;
    const valA = a[columnaOrden];
    const valB = b[columnaOrden];
    if (valA < valB) return direccion === "asc" ? -1 : 1;
    if (valA > valB) return direccion === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {columnas.map((col) => (
              <th
                key={String(col.clave)}
                onClick={() => handleOrden(col.clave)}
                style={{ cursor: "pointer", padding: "0.5rem", border: "1px solid #ccc", background: "#f0f0f0" }}
              >
                {col.cabecera}
                {columnaOrden === col.clave ? (direccion === "asc" ? " ▲" : " ▼") : " ↕"}
              </th>
            ))}
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosOrdenados.map((fila) => (
            <tr key={fila.id}>
              {columnas.map((col) => (
                <td key={String(col.clave)} style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                  {String(fila[col.clave])}
                </td>
              ))}
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                <button onClick={() => setFilaEditando(fila)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filaEditando && (
        <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
          <h3>Editando fila</h3>
          <pre>{JSON.stringify(filaEditando, null, 2)}</pre>
          <button onClick={() => setFilaEditando(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}