import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TrabajosComponent } from './trabajos.component';
import { TrabajosTableComponent } from './components/trabajos-table/trabajos-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TrabajosComponent,
    children: [
      { path: 'trabajos-table', component: TrabajosTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
