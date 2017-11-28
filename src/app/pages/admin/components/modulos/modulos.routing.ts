import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ModulosComponent } from './modulos.component';
import { ModulosTableComponent } from './components/modulos-table/modulos-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ModulosComponent,
    children: [
      { path: 'modulos-table', component: ModulosTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
