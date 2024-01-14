import { Component, OnInit } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.css']
})
export class NuevoPacienteComponent implements OnInit {
  patient : any = {}
  constructor(private router: Router) { 

  }

  ngOnInit() {
  }

  handlePatientForm(e: Event){
    const input = e.target as HTMLInputElement
    this.patient[input.name] = input.value.trim()
    //console.log(this.patient)
  }

  handlePatientSubmit(e: Event){
    e.preventDefault()
    console.log(this.patient)
    this.savePatient()
    
  }

  savePatient(){
    fetch(enviroments['route-api']+'/pacientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(this.patient)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      //const user = JSON.parse(data)
      const user_id = data._id
      this.router.navigate([`/pacientes/${user_id}/`])
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

    console.log('enviado')
  }
  
}
