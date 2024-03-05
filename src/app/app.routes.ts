import { PacienteEpisodioNewComponent } from './page/paciente-episodio-new/paciente-episodio-new.component';
import { Routes } from '@angular/router';


import { PacienteViewComponent } from './page/paciente-view/paciente-view.component';
import { NuevoPacienteComponent } from './page/nuevo-paciente/nuevo-paciente.component';
import { PacienteFileComponent } from './page/paciente-file/paciente-file.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { PacienteEpisodioComponent } from './page/paciente-episodio/paciente-episodio.component';
import { MyProfileComponent } from './page/my-profile/my-profile.component';
import { CalendarComponent } from './page/calendar/calendar.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        
    },

    {
        path: 'pacientes',
        component: PacienteViewComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'pacientes/new',
        component: NuevoPacienteComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'pacientes/:id',
        component: PacienteFileComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'pacientes/:id/episodio/new',
        component: PacienteEpisodioNewComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'pacientes/:id/episodio/:id',
        component: PacienteEpisodioComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path:'my-profile',
        component: MyProfileComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path:'calendar',
        component: CalendarComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

