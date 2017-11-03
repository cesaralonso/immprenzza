
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './personas.routing';
import { PersonasComponent } from './personas.component';

import { PersonasAddModalComponent } from './components/personas-table/personas-add-modal/personas-add-modal.component';
import { PersonasEditModalComponent } from './components/personas-table/personas-edit-modal/personas-edit-modal.component';
import { PersonasService } from './components/personas-table/personas.service';

import { PersonasTableComponent } from './components/personas-table/personas-table.component';
import { DataFilterPipe } from './components/personas-table/data-filter.pipe';

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
    PersonasComponent,
    PersonasTableComponent,
    DataFilterPipe,
    PersonasAddModalComponent,
    PersonasEditModalComponent,
  ],
  entryComponents: [
    PersonasAddModalComponent,
    PersonasEditModalComponent,
  ],
  providers: [
    PersonasService,
  ]
})
export class PersonasModule {
}
