
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './puestos.routing';
import { PuestosComponent } from './puestos.component';

import { PuestosAddModalComponent } from './components/puestos-table/puestos-add-modal/puestos-add-modal.component';
import { PuestosEditModalComponent } from './components/puestos-table/puestos-edit-modal/puestos-edit-modal.component';
import { PuestosService } from './components/puestos-table/puestos.service';

import { PuestosTableComponent } from './components/puestos-table/puestos-table.component';
import { DataFilterPipe } from './components/puestos-table/data-filter.pipe';

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
    PuestosComponent,
    PuestosTableComponent,
    DataFilterPipe,
    PuestosAddModalComponent,
    PuestosEditModalComponent,
  ],
  entryComponents: [
    PuestosAddModalComponent,
    PuestosEditModalComponent,
  ],
  providers: [
    PuestosService,
  ]
})
export class PuestosModule {
}
