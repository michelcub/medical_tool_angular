import { Component, OnInit } from '@angular/core';
import { PacienteHistoriaComponent } from '../paciente-historia/paciente-historia.component';
import { PacienteCitasComponent } from '../paciente-citas/paciente-citas.component';
import { PacienteDocumentosComponent } from '../paciente-documentos/paciente-documentos.component';
import { PacienteDatosComponent } from '../paciente-datos/paciente-datos.component';
import { PacientePagosComponent } from '../paciente-pagos/paciente-pagos.component';

@Component({
  selector: 'app-paciente-tabs',
  templateUrl: './paciente-tabs.component.html',
  styleUrls: ['./paciente-tabs.component.css'],
  standalone: true,
  imports: [PacienteHistoriaComponent, PacienteCitasComponent, PacienteDocumentosComponent, PacienteDatosComponent, PacientePagosComponent],
})
export class PacienteTabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
