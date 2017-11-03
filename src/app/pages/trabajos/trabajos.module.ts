
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './trabajos.routing';
import { TrabajosComponent } from './trabajos.component';

import { TrabajosAddModalComponent } from './components/trabajos-table/trabajos-add-modal/trabajos-add-modal.component';
import { TrabajosEditModalComponent } from './components/trabajos-table/trabajos-edit-modal/trabajos-edit-modal.component';
import { TrabajosService } from './components/trabajos-table/trabajos.service';

import { TrabajosTableComponent } from './components/trabajos-table/trabajos-table.component';
import { DataFilterPipe } from './components/trabajos-table/data-filter.pipe';

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
    TrabajosComponent,
    TrabajosTableComponent,
    DataFilterPipe,
    TrabajosAddModalComponent,
    TrabajosEditModalComponent,
  ],
  entryComponents: [
    TrabajosAddModalComponent,
    TrabajosEditModalComponent,
  ],
  providers: [
    TrabajosService,
  ]
})
export class TrabajosModule {
}
