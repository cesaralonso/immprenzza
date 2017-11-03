
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './checkouts.routing';
import { CheckoutsComponent } from './checkouts.component';

import { CheckoutsAddModalComponent } from './components/checkouts-table/checkouts-add-modal/checkouts-add-modal.component';
import { CheckoutsEditModalComponent } from './components/checkouts-table/checkouts-edit-modal/checkouts-edit-modal.component';
import { CheckoutsService } from './components/checkouts-table/checkouts.service';

import { CheckoutsTableComponent } from './components/checkouts-table/checkouts-table.component';
import { DataFilterPipe } from './components/checkouts-table/data-filter.pipe';

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
    CheckoutsComponent,
    CheckoutsTableComponent,
    DataFilterPipe,
    CheckoutsAddModalComponent,
    CheckoutsEditModalComponent,
  ],
  entryComponents: [
    CheckoutsAddModalComponent,
    CheckoutsEditModalComponent,
  ],
  providers: [
    CheckoutsService,
  ]
})
export class CheckoutsModule {
}
