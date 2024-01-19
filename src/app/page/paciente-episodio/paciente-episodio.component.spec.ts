/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacienteEpisodioComponent } from './paciente-episodio.component';

describe('PacienteEpisodioComponent', () => {
  let component: PacienteEpisodioComponent;
  let fixture: ComponentFixture<PacienteEpisodioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEpisodioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEpisodioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
