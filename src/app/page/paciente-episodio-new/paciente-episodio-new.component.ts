import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { enviroments } from '../../../enviroments/enviroments';
import { PacienteEpisodioFormComponent } from '../../components/pacientes/paciente-episodio-form/paciente-episodio-form.component';
import { PacienteEpisodioRightMenuComponent } from '../../components/pacientes/paciente-episodio-right-menu/paciente-episodio-right-menu.component';
import { Episodio } from '../../models/episodio.models';
import { EpisodioService } from '../../services/episodios/episodio.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-paciente-episodio-new',
  templateUrl: './paciente-episodio-new.component.html',
  styleUrls: ['./paciente-episodio-new.component.css'],
  standalone: true,
  imports:[PacienteEpisodioFormComponent, PacienteEpisodioRightMenuComponent]
})
export class PacienteEpisodioNewComponent implements OnInit, OnDestroy {

  episodioActual: Episodio | null;
  private subscription: Subscription;
  paciente_id = null;
  employee_id = '';
  constructor(private route: ActivatedRoute, private episodioService: EpisodioService) { 
    this.episodioActual = null;
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];  // Replace
      this.paciente_id = id;
    })

    this.subscription = this.episodioService.consultaActual.subscribe(
      episodio => {
        this.episodioActual = episodio;
      }
    );
    this.employee_id = String(localStorage.getItem('user'))
    
    this.iniciarEpisodio();
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.finalizarEpisodio();
  }

  iniciarEpisodio() {
    const nuevoEpisodio = {
      paciente_id: String(this.paciente_id),
      employee_id: this.employee_id,
      cobrado: false,
    };
    console.log(nuevoEpisodio);
    this.episodioService.iniciarConsulta(nuevoEpisodio);
  }

  finalizarEpisodio() {
    this.episodioService.finalizarConsulta();
  }
  

}
