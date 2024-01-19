/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacienteEpisodioFormComponent } from './paciente-episodio-form.component';

describe('PacienteEpisodioFormComponent', () => {
  let component: PacienteEpisodioFormComponent;
  let fixture: ComponentFixture<PacienteEpisodioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEpisodioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEpisodioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
