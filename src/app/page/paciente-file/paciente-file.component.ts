import { PacienteTabsComponent } from './../../components/pacientes/paciente-tabs/paciente-tabs.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { enviroments } from '../../../enviroments/enviroments';
import { UserDetailsComponent } from '../../components/pacientes/user-details/user-details.component';
import { Paciente } from '../../models/paciente.models';


@Component({
  selector: 'app-paciente-file',
  templateUrl: './paciente-file.component.html',
  styleUrls: ['./paciente-file.component.css'],
  standalone: true,
  imports: [UserDetailsComponent, PacienteTabsComponent],
})
export class PacienteFileComponent implements OnInit {
  paciente : any = {}
  cita = null
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];  // Replace
      const citaId = params['citaId'];  // Replace
      console.log(id)
      this.getPatient(id)
      
    })
  }
  
  getPatient(id:string){
    fetch(enviroments['route-api']+ `/pacientes/${id}/`, {
      headers: {
        'Aplication-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.paciente = data
    })
  }
}
