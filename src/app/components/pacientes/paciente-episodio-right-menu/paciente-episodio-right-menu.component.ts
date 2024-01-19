import { Component, OnInit } from '@angular/core';
import { Episodio } from '../../../models/episodio.models';
import { EpisodioService } from '../../../services/episodios/episodio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paciente-episodio-right-menu',
  templateUrl: './paciente-episodio-right-menu.component.html',
  styleUrls: ['./paciente-episodio-right-menu.component.css'],
  standalone: true,
})
export class PacienteEpisodioRightMenuComponent implements OnInit {

  consultaActual: Episodio | null;
  private subscription: Subscription;

  resultadoBusqueda: any;
  presentaciones: any;
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
  
      
  
      console.log(consultaActualizada);
      this.episodioService.actualizarConsulta(consultaActualizada);
    }
  }

  buscarMedicamento(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();

    //fetch(`https://api.fda.gov/drug/label.json?search=brand_name:${value}`)
    fetch(`https://cima.aemps.es/cima/rest/medicamentos?nombre=${value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.resultados);
      this.resultadoBusqueda = data.resultados;
    })
  }

  verPresentacion(event: Event) {
    const element = event.target as HTMLInputElement;
    let id = element.id;
    fetch(`https://cima.aemps.es/cima/rest/presentaciones?nregistro=${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.resultados);
      this.presentaciones = data.resultados
    })
  }

}
