import { Routes } from '@angular/router';
import { LandingComponent } from '../componentes/landing/landing.component';
import { RegisterComponent } from '../componentes/register/register/register.component';
import { LoginComponent } from '../componentes/login/login/login.component';
import { DashboardComponent } from '../componentes/dashboard/dashboard/dashboard.component';
import { guardsGuard } from '../componentes/guards/guards.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent }, 
    { path:'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [guardsGuard] },
    { path: '**', redirectTo: '' } 
];
