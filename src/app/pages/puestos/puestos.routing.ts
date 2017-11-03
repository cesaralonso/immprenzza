import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PuestosComponent } from './puestos.component';
import { PuestosTableComponent } from './components/puestos-table/puestos-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PuestosComponent,
    children: [
      { path: 'puestos-table', component: PuestosTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
