
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './admin.routing';
import { Admin } from './admin.component';

import { Users } from './components/users/users.component';
import { UsuariosTable } from './components/users/components/usuarios-table/usuarios-table.component';
import { UserAddModalComponent } 
from './components/users/components/usuarios-table/user-add-modal/user-add-modal.component';
import { UserEditModalComponent } 
from './components/users/components/usuarios-table/user-edit-modal/user-edit-modal.component';
import { UserService } from './components/users/components/usuarios-table/user.service';

import { DataFilterPipe } from './data-filter.pipe';

import { GroupsComponent } from './components/groups/groups.component';
import { GroupsService } from './components/groups/components/groups-table/groups.service';
import { GroupsTableComponent } from './components/groups/components/groups-table/groups-table.component';
import { GroupsEditModalComponent } 
from './components/groups/components/groups-table/groups-edit-modal/groups-edit-modal.component';
import { GroupsAddModalComponent } 
from './components/groups/components/groups-table/groups-add-modal/groups-add-modal.component';

import { ModulosComponent } from './components/modulos/modulos.component';
import { ModulosService } from './components/modulos/components/modulos-table/modulos.service';
import { ModulosTableComponent } from './components/modulos/components/modulos-table/modulos-table.component';
import { ModulosEditModalComponent } 
from './components/modulos/components/modulos-table/modulos-edit-modal/modulos-edit-modal.component';
import { ModulosAddModalComponent } 
from './components/modulos/components/modulos-table/modulos-add-modal/modulos-add-modal.component';

import { PermisosComponent } from './components/permisos/permisos.component';
import { PermisosService } from './components/permisos/components/permisos-table/permisos.service';
import { PermisosTableComponent } from './components/permisos/components/permisos-table/permisos-table.component';
import { PermisosEditModalComponent } 
from './components/permisos/components/permisos-table/permisos-edit-modal/permisos-edit-modal.component';
import { PermisosAddModalComponent } 
from './components/permisos/components/permisos-table/permisos-add-modal/permisos-add-modal.component';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })
  ],
  declarations: [
    Users,
    Admin,
    UsuariosTable,
    DataFilterPipe,
    UserAddModalComponent,
    UserEditModalComponent,
    GroupsComponent,
    GroupsTableComponent,
    GroupsAddModalComponent,
    GroupsEditModalComponent,
    ModulosComponent,
    ModulosTableComponent,
    ModulosAddModalComponent,
    ModulosEditModalComponent,
    PermisosComponent,
    PermisosTableComponent,
    PermisosAddModalComponent,
    PermisosEditModalComponent,
  ],
  entryComponents: [
    UserAddModalComponent,
    UserEditModalComponent,
    GroupsAddModalComponent,
    GroupsEditModalComponent,
    ModulosAddModalComponent,
    ModulosEditModalComponent,
    PermisosAddModalComponent,
    PermisosEditModalComponent,
  ],
  providers: [
    UserService,
    GroupsService,
    ModulosService,
    PermisosService,
  ]
})
export class AdminModule {
}
