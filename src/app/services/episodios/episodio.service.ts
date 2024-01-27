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

  constructor() {}

  iniciarConsulta(episodio: Episodio) {
    this.consultaActualSubject.next(episodio);
  }

  actualizarConsulta(episodio: Episodio) {
    this.consultaActualSubject.next(episodio);
  }

  finalizarConsulta() {
    const episodioActual = this.consultaActualSubject.value; 
    if (episodioActual) {
        fetch(enviroments['route-api'] + '/episodio/new/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(episodioActual) // Usa el episodio actual para el cuerpo de la solicitud
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    } else {
        console.log('No hay episodio actual para finalizar');
    }
    this.consultaActualSubject.next(null);
}

}
