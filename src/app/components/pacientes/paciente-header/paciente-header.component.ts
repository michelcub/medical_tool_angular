import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-header',
  templateUrl: './paciente-header.component.html',
  styleUrls: ['./paciente-header.component.css'],
  imports: [RouterModule],
  standalone: true,
})
export class PacienteHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
