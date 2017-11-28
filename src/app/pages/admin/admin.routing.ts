import { PermisosComponent } from './components/permisos/permisos.component';
import { ModulosComponent } from './components/modulos/modulos.component';
import { GroupsComponent } from './components/groups/groups.component';
import { Routes, RouterModule } from '@angular/router';

import { Admin } from './admin.component';
import { Users } from './components/users/users.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: 'users', component: Users },
      { path: 'groups', component: GroupsComponent },
      { path: 'modulos', component: ModulosComponent },
      { path: 'permisos', component: PermisosComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
