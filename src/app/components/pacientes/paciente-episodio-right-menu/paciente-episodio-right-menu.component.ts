import { Component, OnInit } from '@angular/core';
import { Episodio } from '../../../models/episodio.models';
import { EpisodioService } from '../../../services/episodios/episodio.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paciente-episodio-right-menu',
  templateUrl: './paciente-episodio-right-menu.component.html',
  styleUrls: ['./paciente-episodio-right-menu.component.css'],
  imports: [RouterModule],
  standalone: true,
})
export class PacienteEpisodioRightMenuComponent implements OnInit {

  consultaActual: Episodio | null;
  private subscription: Subscription;

  listaMedicamentos: any;
  resultadoBusqueda: any;
  presentaciones: any;
  presentacionSeleccionada: any = null;
  paciente_id: any;
  constructor(private episodioService: EpisodioService, private route: ActivatedRoute, private router: Router) { 
    this.consultaActual = null;
    this.subscription = new Subscription();
  }

  

  ngOnInit() {
    this.subscription = this.episodioService.consultaActual.subscribe(
      episodio => {
        this.consultaActual = episodio;
      }
    );

    this.route.params.subscribe(params => {
      this.paciente_id = params['id'];
    })
  
    
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
    .then(response => {
        if(!response.ok) return
        return response.json()})
    .then(data => {
      this.resultadoBusqueda = data.resultados;
    })
  }

  verPresentacion(event: Event) {
    const element = event.target as HTMLInputElement;
    let id = element.id;
    fetch(`https://cima.aemps.es/cima/rest/presentaciones?nregistro=${id}`)
    .then(response => response.json())
    .then(data => {
      this.presentaciones = data.resultados
    })
  }

  seleccionarmedicamento(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let id = element.id;
    let medicamento = this.presentaciones.find((medicamento: any) => String(medicamento?.nregistro) === String(id));
    
    this.presentacionSeleccionada = medicamento;
    this.presentaciones = null;
    this.resultadoBusqueda = null;
    console.log(this.presentacionSeleccionada)
  }

  crearIndicacion(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();
    const name = input.name;
    this.presentacionSeleccionada[name] = value;
  }

  guardarIndicacion() {
    console.log('guardando indicacion')
    if(!this.listaMedicamentos?.length){
      this.listaMedicamentos = []
    }
    if(!this.presentacionSeleccionada?.unidades){
      this.presentacionSeleccionada.unidades = 1;
    }
    this.listaMedicamentos.push(this.presentacionSeleccionada)
    this.presentacionSeleccionada = null;
  }

  eliminarMedicamento(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let id = element.id;
    let newList = this.listaMedicamentos.filter((medicamento: any) => String(medicamento?.nregistro) !== String(id));
    this.listaMedicamentos = newList;
  }

  imprimirRecetas() {
    console.log('imprimiendo recetas');
    
  }

  guardarMedicamentos() {
    
    console.log('guardando medicamentos')
    if (!this.listaMedicamentos) {
      // Handle the case where listaMedicamentos is not defined
      console.error('No se puede imprimir recetas sin medicamentos');
      return;
    }
  
    if (this.consultaActual && this.consultaActual.paciente_id) {
      let updatedConsultaActual = {
        ...this.consultaActual,
        prescripcion: this.listaMedicamentos
      };

      this.episodioService.actualizarConsulta(updatedConsultaActual)
    } else {
      // Handle the case where paciente_id is undefined or consultaActual is null
      console.error('Datos de consulta actual incompletos.');
    }
    console.log(this.consultaActual);
  }

  redirectToFitToFly() {
    const paciente_id  = this.consultaActual?.paciente_id;
    this.router.navigate(['calendar/']);
  }


}
