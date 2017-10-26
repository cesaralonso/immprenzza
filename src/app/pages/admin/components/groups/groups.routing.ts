import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GroupsComponent } from './groups.component';
import { GroupsTableComponent } from './components/groups-table/groups-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      { path: 'groups-table', component: GroupsTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
