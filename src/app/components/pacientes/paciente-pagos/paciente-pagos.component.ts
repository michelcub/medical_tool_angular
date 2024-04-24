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
  cobro_seleccionado:any
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
      this.cobros = data.reverse()
    })
  }

  seleccionarCobro(event:Event){
    const target = event.target as HTMLInputElement;
    const id = target.id;
    this.cobros.forEach((cobro:any) => {
      if(cobro._id == id){
        this.cobro_seleccionado = cobro
      }
    })
  }

  selccionarMetodoPago(event:Event){
    const target = event.target as HTMLInputElement;
    const metodo_pago = target.value;
    this.cobro_seleccionado.metodo_pago = metodo_pago
  }

  ralizarCobro(){
    this.cobro_seleccionado.employee_id = this.employe_id
    this.cobro_seleccionado.cobrado = true

    if(!this.cobro_seleccionado.metodo_pago){
      this.cobro_seleccionado.metodo_pago = 'efectivo'
    }

    fetch(enviroments['route-api'] + `/pagos/${this.cobro_seleccionado._id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(this.cobro_seleccionado)
    })
    .then((res) => res.json())
    .then(data => {
      
      this.getPagos()
    })
  }

}
