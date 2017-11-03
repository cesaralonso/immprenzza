
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './abonos.routing';
import { AbonosComponent } from './abonos.component';

import { AbonosAddModalComponent } from './components/abonos-table/abonos-add-modal/abonos-add-modal.component';
import { AbonosEditModalComponent } from './components/abonos-table/abonos-edit-modal/abonos-edit-modal.component';
import { AbonosService } from './components/abonos-table/abonos.service';

import { AbonosTableComponent } from './components/abonos-table/abonos-table.component';
import { DataFilterPipe } from './components/abonos-table/data-filter.pipe';

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
    AbonosComponent,
    AbonosTableComponent,
    DataFilterPipe,
    AbonosAddModalComponent,
    AbonosEditModalComponent,
  ],
  entryComponents: [
    AbonosAddModalComponent,
    AbonosEditModalComponent,
  ],
  providers: [
    AbonosService,
  ]
})
export class AbonosModule {
}
