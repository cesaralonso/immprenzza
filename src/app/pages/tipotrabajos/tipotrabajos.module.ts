
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './tipotrabajos.routing';
import { TipoTrabajosComponent } from './tipotrabajos.component';

import { TipoTrabajosAddModalComponent } from './components/tipotrabajos-table/tipotrabajos-add-modal/tipotrabajos-add-modal.component';
import { TipoTrabajosEditModalComponent } from './components/tipotrabajos-table/tipotrabajos-edit-modal/tipotrabajos-edit-modal.component';
import { TipoTrabajosService } from './components/tipotrabajos-table/tipotrabajos.service';

import { TipoTrabajosTableComponent } from './components/tipotrabajos-table/tipotrabajos-table.component';
import { DataFilterPipe } from './components/tipotrabajos-table/data-filter.pipe';

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
    TipoTrabajosComponent,
    TipoTrabajosTableComponent,
    DataFilterPipe,
    TipoTrabajosAddModalComponent,
    TipoTrabajosEditModalComponent,
  ],
  entryComponents: [
    TipoTrabajosAddModalComponent,
    TipoTrabajosEditModalComponent,
  ],
  providers: [
    TipoTrabajosService,
  ]
})
export class TipoTrabajosModule {
}
