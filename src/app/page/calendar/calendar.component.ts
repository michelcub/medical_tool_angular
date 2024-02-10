import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import Sortable from 'sortablejs';
import  moment from 'moment';
import { CitasService } from '../../services/citas/citas.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  providers: [CitasService],
  imports: [CommonModule]
})
export class CalendarComponent implements OnInit, AfterViewInit  {

  
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


}
