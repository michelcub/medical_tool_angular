export interface Cita {
    _id?: string; // Opcional para cuando se crea una nueva cita y aún no tiene ID
    fecha: string;
    hora: string;
    paciente: string;
    doctor?: string;
    motivo: string;
    estado: 'No realizada' | 'Realizada' | 'Cancelada'; // Puedes ajustar estos valores según los estados que manejes
    semana: string;
  }