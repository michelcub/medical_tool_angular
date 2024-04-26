import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-print-fit-to-fly',
  templateUrl: './print-fit-to-fly.component.html',
  styleUrls: ['./print-fit-to-fly.component.css'],
  standalone: true,
  imports: [ RouterModule],
})
export class PrintFitToFlyComponent implements OnInit {

  patient:any

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   const id = params['id']; 
      
    //   this.getPatient(id)
    // })
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

}
