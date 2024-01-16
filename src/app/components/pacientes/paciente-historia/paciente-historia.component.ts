import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paciente-historia',
  templateUrl: './paciente-historia.component.html',
  styleUrls: ['./paciente-historia.component.css'],
  standalone: true,
})
export class PacienteHistoriaComponent implements OnInit {
  

  ngOnInit() {
  }

  @Input() historia: any = []

}
