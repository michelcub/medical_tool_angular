import { Injectable } from '@angular/core';
import moment from 'moment';
import { enviroments } from '../../../enviroments/enviroments';
import { Cita } from '../../models/citas.models';


@Injectable()
export class CitasService {

  daysInWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

  hoursOpen = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00']
  minutesOpen = ['00', '15', '30', '45']
  weeksOfYear: string[] = [];

  
  toDay :any


  currentDate = moment();
  currentWeek: any
  selectedDay: any = {
    date: '',
    hour: '',
    minute: ''
  }

  showModal = ''
  
  pacienteList: any[] = []

  constructor() { 
    this.toDay = moment().format('dddd, DD/MM');
    console.log(this.toDay);
    this.currentWeek = this.currentDate.week();
    this.updateDaysInWeek();
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
    this.currentWeek = this.currentDate.week(); 
    console.log(this.currentWeek);
    const startOfWeek = this.currentDate.clone().startOf('week');
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, 'days');
      this.daysInWeek.push(day.format('dddd, DD/MM'));
      this.weeksOfYear.push(day.format('YYYY/MM/DD')); // Añade año aquí
    }
    console.log(this.weeksOfYear);
  }
  
  
  resetToCurrentWeek() {
    this.currentDate = moment(); // Establece la fecha actual
    this.updateDaysInWeek();     // Actualiza la vista de la semana
  }
  
  selectDay(event:Event){
    const target = event.target as HTMLInputElement
    this.selectedDay.date = target.id.split('/').join('-')
    this.selectedDay.hour = target.getAttribute('hour')||''
    this.selectedDay.minute = target.getAttribute('minute')||''
    this.selectedDay.week = this.currentWeek||''
    console.log(this.selectedDay)
  }
  
  selectPacienteList(event:Event){
    console.log('click')
    const target = event.target as HTMLInputElement
    this.selectedDay.paciente = target.value
    console.log(this.selectedDay)
    let paciente = this.pacienteList.find(paciente => paciente._id === target.value)
    target.value = paciente.nombre + ' ' + paciente.apellidos
  }

  handleFindPaciente(event:Event){
    const input = event.target as HTMLInputElement
    const value = input.value.trim().split(' ')[0]
    if(value.length > 3){
      console.log(value);
      fetch(enviroments['route-api']+'/pacientes/find/'+value, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            return
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Esto debería mostrar la respuesta de la API
        this.pacienteList = data
    })
    .catch(error => console.error('Error:', error));
    }
  }


  handleInputNewCita(e: Event){
    const input = e.target as HTMLInputElement
    this.selectedDay[input.name] = input.value.trim()
    console.log(this.selectedDay)
  }

  saveCita(){
    const cita = { // Si estás usando TypeScript, mantén :Cita aquí
        estado: 'No realizada',
        fecha: this.selectedDay.date,
        hora: this.selectedDay.hour.split(':')[0] + ':' + this.selectedDay.minute,
        paciente: this.selectedDay.paciente,
        motivo: this.selectedDay.motivo,
        semana: this.selectedDay.week,
        doctor: '' // Asegúrate de asignar un valor adecuado a doctor si es necesario
    };
    console.log(cita); // Esto debería mostrar el objeto cita correctamente formado
    if(!cita.paciente || !cita.motivo){
        alert('Faltan datos');
        return;
    }
    fetch(enviroments['route-api']+'/citas/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cita), // Cambiado de this.selectedDay a cita
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Esto debería mostrar la respuesta de la API
        this.showModal = 'hidden'; // Asegúrate de que esto se maneje correctamente
    })
    .catch(error => console.error('Error:', error));
}

    


}
