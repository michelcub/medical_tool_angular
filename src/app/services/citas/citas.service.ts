import { Paciente } from './../../models/paciente.models';
import { Cita } from './../../models/citas.models';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { enviroments } from '../../../enviroments/enviroments';
import { act } from '@ngrx/effects';
import { Router } from '@angular/router';

@Injectable()
export class CitasService {
  

  daysInWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

  hoursOpen = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00']
  minutesOpen = Array.from({ length: 4 }, (_, index) => {
    let number = index * 15; // Multiplicamos el índice por 15 para obtener los minutos adecuados
    return number < 10 ? `0${number}` : `${number}`;
});
  weeksOfYear: string[] = [];
  duracionCita = ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
  
  toDay :any


  currentDate = moment();
  currentWeek: any
  selectedDay: any = {
    date: '',
    time: '',
  }

  showModal = ''
  
  pacienteList: any[] = []

  selectedCita: any


  citasSemana: Array<{ paciente: Paciente, _id?: string, // Opcional para cuando se crea una nueva cita y aún no tiene ID
      fecha: string,
      hora: string,
      doctor?: string,
      motivo: string,
      estado: 'No realizada' | 'Pago Pendiente' | 'Cancelada' | 'Cobrado', // Puedes ajustar estos valores según los estados que manejes
      semana: string,
      year: string, 
      here: boolean
      active: boolean}
    > = [];
  weekNumber: any;
  year: any;
  monthName: any;

  constructor(private router: Router) { 
    this.toDay = moment().format('dddd, DD/MM');
    console.log(this.toDay);
    this.currentWeek = this.currentDate.week();
    this.updateDaysInWeek();
    this.weekNumber = this.currentDate.format('W');
    this.year = this.currentDate.format('YYYY');
    this.monthName = this.currentDate.format('MMMM')
    this.updateCalendar()
    console.log(this.citasSemana)
  }

  

  goToNextWeek() {
    this.currentDate.add(1, 'weeks');
    this.updateDaysInWeek();
    this.weekNumber = this.currentDate.format('W');
    this.monthName = this.currentDate.format('MMMM')
    // Obtiene el año
    this.year = this.currentDate.format('YYYY');
    console.log('Número de la semana:', this.weekNumber, 'Año:', this.year);
    this.updateCalendar()
  }
  
  goToPreviousWeek() {
    this.currentDate.subtract(1, 'weeks');
    this.updateDaysInWeek();
    this.weekNumber = this.currentDate.format('W');
    this.monthName = this.currentDate.format('MMMM')
    
    // Obtiene el año
    this.year = this.currentDate.format('YYYY');
    console.log('Número de la semana:', this.weekNumber, 'Año:', this.year);
    this.updateCalendar()
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

    this.weekNumber = this.currentDate.format('W');
    this.monthName = this.currentDate.format('MMMM')
    // Obtiene el año
    this.year = this.currentDate.format('YYYY');
    console.log('Número de la semana:', this.weekNumber, 'Año:', this.year);
    this.updateCalendar()
  }
  
  selectDay(event:Event){
    const target = event.target as HTMLInputElement
    this.selectedDay.date = target.id
    this.selectedDay.time = target.getAttribute('time')||''
    this.selectedDay.week = this.currentWeek||''
  }
  
  selectPacienteList(event:Event){
    console.log('click')
    const target = event.target as HTMLInputElement
    let paciente = this.pacienteList.find(paciente => paciente._id === target.value)
    this.selectedDay.paciente = paciente
    console.log(this.selectedDay)
    
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
    console.log('aqui--------------',this.selectedDay.paciente);
    const cita = { // Si estás usando TypeScript, mantén :Cita aquí
        estado: 'No realizada',
        fecha: this.selectedDay.date,
        year: this.selectedDay.date.split('-')[0],
        hora: this.selectedDay.time,
        paciente: this.selectedDay.paciente,
        motivo: this.selectedDay.motivo,
        semana: this.selectedDay.week,
        doctor: '', // Asegúrate de asignar un valor adecuado a doctor si es necesario
        here: false,
        active: true,
    };
    console.log('aqui--------------',this.selectedDay.paciente);
    console.log('aca---------------',cita); // Esto debería mostrar el objeto cita correctamente formado
    if(!cita.paciente || !cita.motivo){
        alert('Faltan datos');
        return;
    }
    console.log('aca---------------',cita);
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
        this.updateCalendar()
    })
    .catch(error => console.error('Error:', error));
}

    
updateCalendar(){
    fetch(enviroments['route-api']+`/citas/${this.weekNumber}/${this.year}/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Esto debería mostrar la respuesta de la API
        
        this.citasSemana = data
    })
    .catch(error => console.error('Error:', error));
}


  selectCita(event:Event){
    const target = (event.target as HTMLElement).closest('button')
    
    const cita = this.citasSemana.find(cita => String(cita._id) === String(target?.id))
    
    this.selectedCita = cita

  } 

  updateCitaProp(event:Event){
    const target = event.target as HTMLInputElement
    this.selectedCita[target.name] = target.value
    this.updateCita()
  }

  updateCita(){

    fetch(enviroments['route-api']+'/citas/'+this.selectedCita._id, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.selectedCita), // Cambiado de this.selectedDay a cita
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Esto debería mostrar la respuesta de la API
        this.updateCalendar()
    })
    .catch(error => console.error('Error:', error));
  }

  cancelarCita(){
    this.selectedCita.estado = 'Cancelada'
    this.selectedCita.active = false
    this.updateCita()
  }

  pacienteHere(){
    this.selectedCita.here = true
    this.updateCita()
  }

  initEpisode(){
    this.selectedCita.estado = 'Pago Pendiente'
    this.updateCita()
    console.log(`/pacientes/${this.selectedCita.paciente._id}/cita/${this.selectedCita._id}`)
    this.router.navigateByUrl(`/pacientes/${String(this.selectedCita.paciente._id)}/cita/${this.selectedCita._id}`)
  }

}
