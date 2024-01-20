// consulta.model.ts
export interface Episodio {
    paciente_id: string;
    employee_id: string;
    employee_charge?: string;
    peso?: string;
    altura?: string;
    imc?: string;
    anamnesis?: string;
    sintomas?: string;
    diagnostico?: string;
    comentarios?: string;
    prescripcion?: any[];
    documentos?: string[];
    imagenes?: string[];
    cobrado: boolean;
    servicios?: string[];

  }
  