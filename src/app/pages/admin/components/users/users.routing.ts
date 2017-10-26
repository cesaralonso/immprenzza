import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Users } from './users.component';
import { UsuariosTable } from './components/usuarios-table/usuarios-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      { path: 'usuarios-table', component: UsuariosTable }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
