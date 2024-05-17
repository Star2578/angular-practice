import { Routes } from '@angular/router';
import { DemographicComponent } from './demographic/demographic.component';
import { FormComponent } from './form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: "login", component: FormComponent },
    { path: "demographic", component: DemographicComponent },
    { path: "dashboard", component: DashboardComponent },
];
