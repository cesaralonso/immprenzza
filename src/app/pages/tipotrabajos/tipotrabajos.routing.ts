import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TipoTrabajosComponent } from './tipotrabajos.component';
import { TipoTrabajosTableComponent } from './components/tipotrabajos-table/tipotrabajos-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TipoTrabajosComponent,
    children: [
      { path: 'tipotrabajos-table', component: TipoTrabajosTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
