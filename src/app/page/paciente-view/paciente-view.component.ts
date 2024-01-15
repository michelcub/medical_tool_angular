import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


import { PacienteHeaderComponent } from '../../components/pacientes/paciente-header/paciente-header.component';

import { enviroments } from '../../../enviroments/enviroments';


@Component({
  selector: 'app-paciente-view',
  templateUrl: './paciente-view.component.html',
  styleUrls: ['./paciente-view.component.css'],
  standalone: true,
  imports: [ RouterModule],
})
export class PacienteViewComponent implements OnInit {
  input: string = ''
  patients: any = []
  constructor(private router: Router) { 

  }

  ngOnInit() {
  }

  handleSearchPatient(e: Event){
    const input = e.target as HTMLInputElement
    this.findPatient(input.value)
  }

  findPatient(input: string){
    this.patients = []
    fetch(enviroments['route-api'] + '/pacientes/find/' + input,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')

      },
      
    }).then(res => {
      console.log(res)
      return res.json()
    }).then(data => {
      this.patients = data
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  selectPatient(e: Event){
    const element = e.target as HTMLElement; // Obtiene el elemento que disparó el evento
    const tr = element.closest('tr'); // Encuentra el <tr> más cercano
    const user_id = tr ? tr.id : null; // Obtiene el id del <tr> si existe
  
    console.log('aqui ' + user_id);
  
    if (user_id) {
      this.router.navigate([`/pacientes/${user_id}/`]);
    }
  }
  

}