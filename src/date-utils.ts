import { differenceInDays } from 'date-fns';

// Función que calcula la diferencia en días entre dos fechas
// Los tipos de entrada y salida son estrictos
export function calcularDiasEntre(fechaInicio: Date, fechaFin: Date): number {
  return differenceInDays(fechaFin, fechaInicio);
}