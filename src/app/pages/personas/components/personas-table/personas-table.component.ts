import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PersonasInterface } from './personas.interface';
import { PersonasResponseInterface } from './personas-response.interface';
import { Component, OnInit } from '@angular/core';
import { PersonasService } from './personas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasAddModalComponent } from './personas-add-modal/personas-add-modal.component';
import { PersonasEditModalComponent } from './personas-edit-modal/personas-edit-modal.component';


@Component({
  selector: 'personas-table',
  templateUrl: './personas-table.html',
  styleUrls: ['./personas-table.scss'],
})
export class PersonasTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpersona';
    sortOrder = 'asc';

    constructor(
      private service: PersonasService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addPersonasModalShow() {
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editPersonasModalShow(personas: PersonasInterface) {
      const disposable = this.dialogService.addDialog(PersonasEditModalComponent, personas)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
  }

    uploadModalShow(id: number, descripcion: string) {
      const activeModal = this.modalService.open(UploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Persona';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Persona';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Persona';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Persona';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarPersona(id)
          .subscribe(
            (data) => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed')
          );
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if (data.idRespuesta === 0) {
        this.toastrService.success(data.mensajeRespuesta);
        this.getAllPersonas();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllPersonas();
    }
    
    private getAllPersonas(): void {
      this.service
          .getAllPersonas()
          .subscribe(
              (data: PersonasInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
