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
  

  constructor(private route: ActivatedRoute, private authService:AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
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
    fetch(`http://localhost:3000/episodio/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log('aqui--------- ' + data)
    })
  }

  getDoctor(id:any){
    fetch(`http://localhost:3000/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log('aqui--------- ' + data)
    })
  }

}
