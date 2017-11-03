import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrdenesComponent } from './ordenes.component';
import { OrdenesTableComponent } from './components/ordenes-table/ordenes-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OrdenesComponent,
    children: [
      { path: 'ordenes-table', component: OrdenesTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
