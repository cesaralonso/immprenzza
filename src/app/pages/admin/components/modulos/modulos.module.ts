
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './modulos.routing';
import { ModulosComponent } from './modulos.component';

import { ModulosAddModalComponent } from './components/modulos-table/modulos-add-modal/modulos-add-modal.component';
import { ModulosEditModalComponent } from './components/modulos-table/modulos-edit-modal/modulos-edit-modal.component';
import { ModulosService } from './components/modulos-table/modulos.service';

import { ModulosTableComponent } from './components/modulos-table/modulos-table.component';
import { DataFilterPipe } from './components/modulos-table/data-filter.pipe';

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
    ModulosComponent,
    ModulosTableComponent,
    DataFilterPipe,
    ModulosAddModalComponent,
    ModulosEditModalComponent,
  ],
  entryComponents: [
    ModulosAddModalComponent,
    ModulosEditModalComponent,
  ],
  providers: [
    ModulosService,
  ]
})
export class ModulosModule {
}
