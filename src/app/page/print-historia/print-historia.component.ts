import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-historia',
  templateUrl: './print-historia.component.html',
  styleUrls: ['./print-historia.component.css'],
  standalone: true,
  imports: [ RouterModule],
})
export class PrintHistoriaComponent implements OnInit {
  
  userName: String = '';
  userLastname: String = '';
  user_rol: String = '';
  user_num_colegiado:any;
  episode: any
  patient: any
  doctor: any
  show: any = {
    anamnesis: true,
    exploracion: true,
    diagnostico: true,
    pruebas_complementarias: true,
    tratamiento: true,
    detalles: true,
    prescription: true,
  }
  


  constructor(private route: ActivatedRoute, private authService:AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.getEpisode(id)
      
    })

    this.userName = this.authService.userName;
    this.userLastname = this.authService.userLastname;
    this.user_rol = this.authService.user_rol;
    this.user_num_colegiado = this.authService.user_num_colegiado;
    
  }

  print(){
    window.print()
  }

  getEpisode(id:any){
    fetch(`http://localhost:3000/api/episodio/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      this.episode = data[0]
      this.getPatient(this.episode?.paciente_id)
      console.log('aqui--------- >>>>' + JSON.stringify(this.episode))
      this.getDoctor(JSON.parse(this.episode?.employee_id))
      
    })
  }

  getPatient(id:any){
    fetch(`http://localhost:3000/api/pacientes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log('aqui--------- ' + JSON.stringify(data))
      this.patient = data
      
    })
  }

  getDoctor(id:any){
    fetch(`http://localhost:3000/api/auth/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log('aqui--------- ' + JSON.stringify(data))
      this.doctor = data
    })
  }

  showHide(event:Event){
    const target = event.target as HTMLInputElement
    this.show[target.name] = !this.show[target.name]
  }
}
