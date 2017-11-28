
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './permisos.routing';
import { PermisosComponent } from './permisos.component';

import { PermisosAddModalComponent } from './components/permisos-table/permisos-add-modal/permisos-add-modal.component';
import { PermisosEditModalComponent } 
from './components/permisos-table/permisos-edit-modal/permisos-edit-modal.component';
import { PermisosService } from './components/permisos-table/permisos.service';

import { PermisosTableComponent } from './components/permisos-table/permisos-table.component';
import { DataFilterPipe } from './components/permisos-table/data-filter.pipe';

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
    PermisosComponent,
    PermisosTableComponent,
    DataFilterPipe,
    PermisosAddModalComponent,
    PermisosEditModalComponent,
  ],
  entryComponents: [
    PermisosAddModalComponent,
    PermisosEditModalComponent,
  ],
  providers: [
    PermisosService,
  ]
})
export class PermisosModule {
}
