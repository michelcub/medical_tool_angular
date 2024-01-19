import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente-episodio-form',
  templateUrl: './paciente-episodio-form.component.html',
  styleUrls: ['./paciente-episodio-form.component.css'],
  standalone: true,
})
export class PacienteEpisodioFormComponent implements OnInit {

  peso=0;
  altura=0;
  IMC=0;
  constructor() { }

  ngOnInit() {
  }

  calcularIMC() {
    // altura está en metros, peso en kg
    if (this.altura > 0 && this.peso > 0) {
        return this.peso / (this.altura * this.altura);
    } else {
        return "Datos inválidos";
    }
  }


}
