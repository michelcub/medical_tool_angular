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
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];  // Replace
      // this.getEpisode(id)
      // window.print()
    })
  }

  print(){
    window.print()
  }

  getEpisode(id:any){
    fetch(`http://localhost:3000/episodio/paciente/${id}`, {
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
