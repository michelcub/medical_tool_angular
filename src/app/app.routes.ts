import { PacienteEpisodioNewComponent } from './page/paciente-episodio-new/paciente-episodio-new.component';
import { Routes } from '@angular/router';


import { PacienteViewComponent } from './page/paciente-view/paciente-view.component';
import { NuevoPacienteComponent } from './page/nuevo-paciente/nuevo-paciente.component';
import { PacienteFileComponent } from './page/paciente-file/paciente-file.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { PacienteEpisodioComponent } from './page/paciente-episodio/paciente-episodio.component';
import { MyProfileComponent } from './page/my-profile/my-profile.component';

export const routes: Routes = [
    {
        path:'',
        component: LoginComponent
    },
    {
        path: 'auth/register',
        component: RegisterComponent
    },

    {
        path: 'pacientes',
        component: PacienteViewComponent
    },
    {
        path: 'pacientes/new',
        component: NuevoPacienteComponent
    },
    {
        path: 'pacientes/:id',
        component: PacienteFileComponent
    },
    {
        path: 'pacientes/:id/episodio/new',
        component: PacienteEpisodioNewComponent
    },
    {
        path: 'pacientes/:id/episodio/:id',
        component: PacienteEpisodioComponent
    },
    {
        path:'my-profile',
        component: MyProfileComponent
    }
];

