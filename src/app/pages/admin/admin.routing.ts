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
    ]
  }
];

export const routing = RouterModule.forChild(routes);
