import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import Sortable from 'sortablejs';
import  moment from 'moment';
import { CitasService } from '../../services/citas/citas.service';
import { enviroments } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  providers: [CitasService],
  imports: [CommonModule]
})
export class CalendarComponent implements OnInit, AfterViewInit  {

  cobro_seleccionado:any
  show_create_cita = 'd-none';

  constructor(@Inject(CitasService) public citasService: CitasService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeDragAndDrop();
  }
  initializeDragAndDrop() {
    const containers = document.querySelectorAll('.dragable');
  
    containers.forEach(container => {
      // Realizamos un casting de 'container' a 'HTMLElement'
      if (container instanceof HTMLElement) {
        new Sortable(container, {
          group: 'shared', // Esto permite arrastrar entre diferentes contenedores
          animation: 0,  // Duración de la animación en ms
          swap: false,
          // Puedes añadir más opciones según tus necesidades
          onEnd: (event) => {
            console.log('Arrastre finalizado');
            console.log('Índice de inicio:', event.oldIndex);
            console.log('Índice de finalización:', event.newIndex);
            // Aquí puedes agregar más lógica para manejar el evento de soltar
          },
        });
      }
    });
  }

  showModalCreateCita() {
    this.show_create_cita = '';
  }

  hideModalCreateCita() {
    this.show_create_cita = 'd-none';
  }

  getPagos(){
    
    fetch(enviroments['route-api'] + `/pagos/paciente/${this.citasService.selectedCita.paciente._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log('aqui--------- ' + data)
      this.citasService.cobros = data
    })
  }

  seleccionarCobro(event:Event){
    const target = event.target as HTMLInputElement;
    const id = target.id;
    this.citasService.cobros.forEach((cobro:any) => {
      if(cobro._id == id){
        this.cobro_seleccionado = cobro
      }
    })
  }

  selccionarMetodoPago(event:Event){
    const target = event.target as HTMLInputElement;
    const metodo_pago = target.value;
    this.cobro_seleccionado.metodo_pago = metodo_pago
  }

  realizarCobro(){
    const employee_id = localStorage.getItem('user')
    this.cobro_seleccionado.employee_id = employee_id
    this.cobro_seleccionado.cobrado = true

    if(!this.cobro_seleccionado.metodo_pago){
      this.cobro_seleccionado.metodo_pago = 'efectivo'
    }

    fetch(enviroments['route-api'] + `/pagos/${this.cobro_seleccionado._id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(this.cobro_seleccionado)
    })
    .then((res) => res.json())
    .then(data => {
      
      this.citasService.cobrarCita()
    })
  }

}
