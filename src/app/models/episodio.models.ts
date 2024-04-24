// consulta.model.ts
export interface Episodio {
    _id?: string;
    paciente_id: string;
    employee_id: string;
    employee_charge?: string;
    peso?: string;
    altura?: string;
    imc?: string;
    anamnesis?: string;
    exploracion?: string;
    diagnostico?: string;
    pruebas_complementarias?: string;
    tratamiento?: string;
    detalles?: string;
    prescripcion?: any[];
    documentos?: string[];
    imagenes?: string[];
    cobrado: boolean;
    servicios?: string[];
    date?: string;
    cita_id?: string;
  }
  