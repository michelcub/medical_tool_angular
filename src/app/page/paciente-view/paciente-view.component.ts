import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteHeaderComponent } from '../../components/pacientes/paciente-header/paciente-header.component';
@Component({
  selector: 'app-paciente-view',
  templateUrl: './paciente-view.component.html',
  styleUrls: ['./paciente-view.component.css'],
  standalone: true,
  imports: [CommonModule, PacienteHeaderComponent],
})
export class PacienteViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}