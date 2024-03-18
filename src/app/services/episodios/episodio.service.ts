import { Cita } from './../../models/citas.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Episodio } from '../../models/episodio.models';
import { enviroments } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class EpisodioService {
  private consultaActualSubject: BehaviorSubject<Episodio | null> = new BehaviorSubject<Episodio | null>(null);
  public consultaActual: Observable<Episodio | null> = this.consultaActualSubject.asObservable();
  citaId = ''
  constructor() {}

  iniciarConsulta(episodio: Episodio) {
    this.consultaActualSubject.next(episodio);
  }

  actualizarConsulta(episodio: Episodio) {
    this.consultaActualSubject.next(episodio);
  }

  finalizarConsulta() {
    const episodioActual = this.consultaActualSubject.value;
    let episodio_id
    episodioActual?.servicios?.push('consulta') 
    if (episodioActual) {

        //guardar episodio
        fetch(enviroments['route-api'] + '/episodio/new/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(episodioActual) // Usa el episodio actual para el cuerpo de la solicitud
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            episodio_id = data._id
            console.log('episodio_id------ ' + episodio_id)
            this.generarCobro(episodioActual, episodio_id)
          })
          .catch(error => console.error('Error:', error));

        

        
    } else {
        console.log('No hay episodio actual para finalizar');
    }
    this.consultaActualSubject.next(null);
}


generarCobro(episodioActual:Episodio, episodio_id:string):void{
  //generar cobro
  fetch(enviroments['route-api'] + '/pagos/',{
    method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        "paciente_id": episodioActual.paciente_id,
        "doctor_id": JSON.parse(episodioActual.employee_id),
        "monto": 100.00,
        "cobrado": false,
        "servicios": episodioActual.servicios,
        "episodio_id": episodio_id,
        "cita_id": this.citaId
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

}
