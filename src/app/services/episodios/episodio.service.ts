import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Episodio } from '../../models/episodio.models';

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
    this.consultaActualSubject.next(null);
  }

  obtenerConsultaActual(): Episodio | null {
    return this.consultaActualSubject.value;
  }
}
