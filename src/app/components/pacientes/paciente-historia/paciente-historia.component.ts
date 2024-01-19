import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-historia',
  templateUrl: './paciente-historia.component.html',
  styleUrls: ['./paciente-historia.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class PacienteHistoriaComponent implements OnInit {
  

  ngOnInit() {
  }

  @Input() historia: any = []

}
