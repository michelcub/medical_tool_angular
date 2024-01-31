import { Component, OnInit, Input, Inject } from '@angular/core';
import Sortable from 'sortablejs';
import  moment from 'moment';
import { CitasService } from '../../services/citas/citas.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  providers: [CitasService]
})
export class CalendarComponent implements OnInit {

  

  constructor(@Inject(CitasService) public citasService: CitasService) { }

  ngOnInit() {
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
    const containers = document.querySelectorAll('.box-calendar');
  
    containers.forEach(container => {
      // Realizamos un casting de 'container' a 'HTMLElement'
      if (container instanceof HTMLElement) {
        new Sortable(container, {
          group: 'shared', // Esto permite arrastrar entre diferentes contenedores
          animation: 150,  // Duración de la animación en ms
          // Puedes añadir más opciones según tus necesidades
        });
      }
    });
  }

  


}
