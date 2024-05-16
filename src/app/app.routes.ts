import { Routes } from '@angular/router';
import { DemographicComponent } from './demographic/demographic.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    { path: "login", component: FormComponent },
    { path: "demographic", component: DemographicComponent },
];
