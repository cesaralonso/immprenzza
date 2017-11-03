import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { OrdenesInterface } from './ordenes.interface';
import { OrdenesResponseInterface } from './ordenes-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdenesService } from './ordenes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenesAddModalComponent } from './ordenes-add-modal/ordenes-add-modal.component';
import { OrdenesEditModalComponent } from './ordenes-edit-modal/ordenes-edit-modal.component';


@Component({
  selector: 'ordenes-table',
  templateUrl: './ordenes-table.html',
  styleUrls: ['./ordenes-table.scss'],
})
export class OrdenesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idorden';
    sortOrder = 'asc';

    constructor(
      private service: OrdenesService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addOrdenesModalShow() {
      const disposable = this.dialogService.addDialog(OrdenesAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editOrdenesModalShow(ordenes: OrdenesInterface) {
      const disposable = this.dialogService.addDialog(OrdenesEditModalComponent, ordenes)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Orden';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Orden';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Orden';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Orden';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarOrden(id)
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
        this.getAllOrdenes();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllOrdenes();
    }
    
    private getAllOrdenes(): void {
      this.service
          .getAllOrdenes()
          .subscribe(
              (data: OrdenesInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
