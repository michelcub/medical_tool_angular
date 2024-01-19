/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacienteEpisodioRightMenuComponent } from './paciente-episodio-right-menu.component';

describe('PacienteEpisodioRightMenuComponent', () => {
  let component: PacienteEpisodioRightMenuComponent;
  let fixture: ComponentFixture<PacienteEpisodioRightMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEpisodioRightMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEpisodioRightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
