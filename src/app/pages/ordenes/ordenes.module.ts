
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './ordenes.routing';
import { OrdenesComponent } from './ordenes.component';

import { OrdenesAddModalComponent } from './components/ordenes-table/ordenes-add-modal/ordenes-add-modal.component';
import { OrdenesEditModalComponent } from './components/ordenes-table/ordenes-edit-modal/ordenes-edit-modal.component';
import { OrdenesService } from './components/ordenes-table/ordenes.service';

import { OrdenesTableComponent } from './components/ordenes-table/ordenes-table.component';
import { DataFilterPipe } from './components/ordenes-table/data-filter.pipe';

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
    OrdenesComponent,
    OrdenesTableComponent,
    DataFilterPipe,
    OrdenesAddModalComponent,
    OrdenesEditModalComponent,
  ],
  entryComponents: [
    OrdenesAddModalComponent,
    OrdenesEditModalComponent,
  ],
  providers: [
    OrdenesService,
  ]
})
export class OrdenesModule {
}
