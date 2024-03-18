import { Cita } from './../../../models/citas.models';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { enviroments } from '../../../../enviroments/enviroments';
import { ActivatedRoute } from '@angular/router';
import { Episodio } from '../../../models/episodio.models';
@Component({
  selector: 'app-paciente-historia',
  templateUrl: './paciente-historia.component.html',
  styleUrls: ['./paciente-historia.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class PacienteHistoriaComponent implements OnInit {
  
  episodes: Episodio[] = [];
  paciente_id = ''
  citaId = null
  constructor( private route: ActivatedRoute){
    this.episodes = []
  }
  ngOnInit() {
    this.episodes = []
    this.route.params.subscribe(params => {
      const id = params['id'];  // Replace
      this.citaId = params['citaId'] || null
      console.log(this.citaId)
      this.paciente_id = id;
      this.getAllEpisodes()
    })
  }

  @Input() historia: any = []

  getAllEpisodes(){
    fetch(enviroments['route-api'] + `/episodio/paciente/${this.paciente_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log('aqui--------- ' + data)
      this.episodes = data
    })
  }

}
