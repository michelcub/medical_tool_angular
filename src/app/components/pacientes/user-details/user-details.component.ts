import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Paciente } from '../../../models/paciente.models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  standalone: true,
})
export class UserDetailsComponent implements OnInit {

  @Input() paciente!: Paciente;
  initial: string = '';
  data: string = '';
  numero: string = '';
  constructor() {}

  ngOnInit(): void {
    console.log(this.paciente);
    if (this.paciente) {
      this.setInitials();
      this.setDates();
      this.setNumber()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paciente'] && this.paciente) {
      this.setInitials();
      this.setDates();
      this.setNumber()
    }
  }
  

  private setInitials(): void {
    // Make sure 'nombre' and 'apellidos' are not undefined or empty strings
    if (this.paciente.nombre && this.paciente.apellidos) {
      this.initial = `${this.paciente.nombre.charAt(0)}${this.paciente.apellidos.charAt(0)}`;
    }
  }

  private setDates(): void {
    if (this.paciente.fecha_nacimiento) {
      const date = this.paciente.fecha_nacimiento.split('-');
      this.data = `${date[2]}/${date[1]}/${date[0]}`;
    }
  }

  private setNumber(): void {
    if (this.paciente._id) {
      this.numero = String(this.paciente._id).slice(0,5);
      console.log(this.numero)
    }
  }
}
