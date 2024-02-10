import { Paciente } from "./paciente.models";

export interface Cita {
    _id?: string; // Opcional para cuando se crea una nueva cita y aún no tiene ID
    fecha: string;
    hora: string;
    paciente: Paciente;
    doctor?: string;
    motivo: string;
    estado: 'No realizada' | 'Pago Pendiente' | 'Cancelada' | 'Cobrado'; // Puedes ajustar estos valores según los estados que manejes
    semana: string;
    year: string;
    here: boolean;
    active: boolean;
  }