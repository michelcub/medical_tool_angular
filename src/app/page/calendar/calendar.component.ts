import { Component, OnInit, Input } from '@angular/core';
import Sortable from 'sortablejs';
import  moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  daysInWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

  hoursOpen = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00']
  minutesOpen = ['00', '15', '30', '45']
  weeksOfYear: string[] = [];

  
  toDay :any


  currentDate = moment();

  selectedDay = {
    date: '',
    hour: ''
  }

  constructor() { }

  ngOnInit() {
    this.initializeDragAndDrop();
    this.updateDaysInWeek();
    this.toDay = moment().format('dddd, DD/MM');
    console.log(this.toDay);
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

  goToNextWeek() {
    this.currentDate.add(1, 'weeks');
    this.updateDaysInWeek();
  }
  
  goToPreviousWeek() {
    this.currentDate.subtract(1, 'weeks');
    this.updateDaysInWeek();
  }
  
  updateDaysInWeek() {
    this.daysInWeek = [];
    this.weeksOfYear = [];
    const startOfWeek = this.currentDate.clone().startOf('week');
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, 'days');
      this.daysInWeek.push(day.format('dddd, DD/MM'));
      this.weeksOfYear.push(day.format('dddd, DD/MM/YYYY')); // Añade año aquí
    }
    console.log(this.weeksOfYear);
  }
  
  
  resetToCurrentWeek() {
    this.currentDate = moment(); // Establece la fecha actual
    this.updateDaysInWeek();     // Actualiza la vista de la semana
  }
  
  selectDay(event:Event){
    const target = event.target as HTMLInputElement
    this.selectedDay.date = target.id
    this.selectedDay.hour = target.getAttribute('hour')||''
    console.log(this.selectedDay)
  }
  
}
