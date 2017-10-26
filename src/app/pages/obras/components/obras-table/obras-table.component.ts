import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ObrasInterface } from './obras.interface';
import { ObrasResponseInterface } from './obras-response.interface';
import { Component, OnInit } from '@angular/core';
import { ObrasService } from './obras.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObrasAddModalComponent } from './obras-add-modal/obras-add-modal.component';
import { ObrasEditModalComponent } from './obras-edit-modal/obras-edit-modal.component';


@Component({
  selector: 'obras-table',
  templateUrl: './obras-table.html',
  styleUrls: ['./obras-table.scss'],
})
export class ObrasTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idobra';
    sortOrder = 'asc';

    constructor(
      private service: ObrasService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addObrasModalShow() {
      const disposable = this.dialogService.addDialog(ObrasAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editObrasModalShow(obras: ObrasInterface) {
      const disposable = this.dialogService.addDialog(ObrasEditModalComponent, obras)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Obra';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Obra';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Obra';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Obra';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarObra(id)
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
        this.getAllObras();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllObras();
    }
    
    private getAllObras(): void {
      this.service
          .getAllObras()
          .subscribe(
              (data: ObrasInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
