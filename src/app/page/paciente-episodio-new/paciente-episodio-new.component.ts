import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { enviroments } from '../../../enviroments/enviroments';
import { PacienteEpisodioFormComponent } from '../../components/pacientes/paciente-episodio-form/paciente-episodio-form.component';
import { PacienteEpisodioRightMenuComponent } from '../../components/pacientes/paciente-episodio-right-menu/paciente-episodio-right-menu.component';


@Component({
  selector: 'app-paciente-episodio-new',
  templateUrl: './paciente-episodio-new.component.html',
  styleUrls: ['./paciente-episodio-new.component.css'],
  standalone: true,
  imports:[PacienteEpisodioFormComponent, PacienteEpisodioRightMenuComponent]
})
export class PacienteEpisodioNewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];  // Replace
      console.log(id)
    })
  }

}
