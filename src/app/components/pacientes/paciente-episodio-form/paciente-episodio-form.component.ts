import { Component, OnInit } from '@angular/core';
import { Episodio } from '../../../models/episodio.models';
import { EpisodioService } from '../../../services/episodios/episodio.service';
import { Subscription } from 'rxjs';

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

  consultaActual: Episodio | null;
  private subscription: Subscription;

  constructor(private episodioService: EpisodioService) { 
    this.consultaActual = null;
    this.subscription = new Subscription();
  }

  

  ngOnInit() {
    this.subscription = this.episodioService.consultaActual.subscribe(
      episodio => {
        this.consultaActual = episodio;
      }
    );
  }

  calcularIMC() {
    // altura está en metros, peso en kg
    if (this.altura > 0 && this.peso > 0) {
        return this.peso / (this.altura * this.altura);
    } else {
        return "Datos inválidos";
    }
  }

  actualizarConsulta(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let name = inputElement.name;
    let value = inputElement.value.trim();
  
    if (this.consultaActual) {
      // Comprobación adicional para asegurarse de que el nombre existe en consultaActual
      const consultaActualizada: Episodio = {
        ...this.consultaActual,
        [name]: value, // Actualización dinámica basada en el nombre del campo
      };
  
      // Puedes actualizar aquí peso, altura e imc si es necesario
      if (name === 'peso' || name === 'altura') {
        consultaActualizada.peso = this.peso.toString();
        consultaActualizada.altura = this.altura.toString();
        consultaActualizada.imc = this.calcularIMC().toString();
      }
  
      console.log(consultaActualizada);
      this.episodioService.actualizarConsulta(consultaActualizada);
    }
  }

}
