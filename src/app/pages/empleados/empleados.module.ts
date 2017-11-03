
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './empleados.routing';
import { EmpleadosComponent } from './empleados.component';

import { EmpleadosAddModalComponent } from './components/empleados-table/empleados-add-modal/empleados-add-modal.component';
import { EmpleadosEditModalComponent } from './components/empleados-table/empleados-edit-modal/empleados-edit-modal.component';
import { EmpleadosService } from './components/empleados-table/empleados.service';

import { EmpleadosTableComponent } from './components/empleados-table/empleados-table.component';
import { DataFilterPipe } from './components/empleados-table/data-filter.pipe';

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
    EmpleadosComponent,
    EmpleadosTableComponent,
    DataFilterPipe,
    EmpleadosAddModalComponent,
    EmpleadosEditModalComponent,
  ],
  entryComponents: [
    EmpleadosAddModalComponent,
    EmpleadosEditModalComponent,
  ],
  providers: [
    EmpleadosService,
  ]
})
export class EmpleadosModule {
}
