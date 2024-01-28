import { Component, OnInit } from '@angular/core';
import { enviroments } from '../../../../enviroments/enviroments';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-paciente-pagos',
  templateUrl: './paciente-pagos.component.html',
  styleUrls: ['./paciente-pagos.component.css'],
  standalone: true,
})
export class PacientePagosComponent implements OnInit {

  cobros:any
  paciente_id = ''
  employe_id

  constructor( private route: ActivatedRoute){
    this.cobros = []
    this.employe_id = localStorage.getItem('user')
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];  // Replace
      this.paciente_id = id;
      this.getPagos()
    })
  }



  getPagos(){
    fetch(enviroments['route-api'] + `/pagos/paciente/${this.paciente_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log('aqui--------- ' + data)
      this.cobros = data
    })
  }
}
