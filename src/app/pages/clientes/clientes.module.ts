
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './clientes.routing';
import { ClientesComponent } from './clientes.component';

import { ClientesAddModalComponent } from './components/clientes-table/clientes-add-modal/clientes-add-modal.component';
import { ClientesEditModalComponent } from './components/clientes-table/clientes-edit-modal/clientes-edit-modal.component';
import { ClientesService } from './components/clientes-table/clientes.service';

import { ClientesTableComponent } from './components/clientes-table/clientes-table.component';
import { DataFilterPipe } from './components/clientes-table/data-filter.pipe';

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
    ClientesComponent,
    ClientesTableComponent,
    DataFilterPipe,
    ClientesAddModalComponent,
    ClientesEditModalComponent,
  ],
  entryComponents: [
    ClientesAddModalComponent,
    ClientesEditModalComponent,
  ],
  providers: [
    ClientesService,
  ]
})
export class ClientesModule {
}
