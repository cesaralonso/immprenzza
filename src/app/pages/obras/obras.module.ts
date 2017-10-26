
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './obras.routing';
import { ObrasComponent } from './obras.component';

import { ObrasAddModalComponent } from './components/obras-table/obras-add-modal/obras-add-modal.component';
import { ObrasEditModalComponent } from './components/obras-table/obras-edit-modal/obras-edit-modal.component';
import { ObrasService } from './components/obras-table/obras.service';

import { ObrasTableComponent } from './components/obras-table/obras-table.component';
import { DataFilterPipe } from './components/obras-table/data-filter.pipe';

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
    ObrasComponent,
    ObrasTableComponent,
    DataFilterPipe,
    ObrasAddModalComponent,
    ObrasEditModalComponent,
  ],
  entryComponents: [
    ObrasAddModalComponent,
    ObrasEditModalComponent,
  ],
  providers: [
    ObrasService,
  ]
})
export class ObrasModule {
}
