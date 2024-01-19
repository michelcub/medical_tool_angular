/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacienteEpisodioNewComponent } from './paciente-episodio-new.component';

describe('PacienteEpisodioNewComponent', () => {
  let component: PacienteEpisodioNewComponent;
  let fixture: ComponentFixture<PacienteEpisodioNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEpisodioNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEpisodioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
