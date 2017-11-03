import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CheckoutsInterface } from './checkouts.interface';
import { CheckoutsResponseInterface } from './checkouts-response.interface';
import { Component, OnInit } from '@angular/core';
import { CheckoutsService } from './checkouts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutsAddModalComponent } from './checkouts-add-modal/checkouts-add-modal.component';
import { CheckoutsEditModalComponent } from './checkouts-edit-modal/checkouts-edit-modal.component';


@Component({
  selector: 'checkouts-table',
  templateUrl: './checkouts-table.html',
  styleUrls: ['./checkouts-table.scss'],
})
export class CheckoutsTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcheckout';
    sortOrder = 'asc';

    constructor(
      private service: CheckoutsService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addCheckoutsModalShow() {
      const disposable = this.dialogService.addDialog(CheckoutsAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editCheckoutsModalShow(checkouts: CheckoutsInterface) {
      const disposable = this.dialogService.addDialog(CheckoutsEditModalComponent, checkouts)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Checkout';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Checkout';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Checkout';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Checkout';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarCheckout(id)
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
        this.getAllCheckouts();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllCheckouts();
    }
    
    private getAllCheckouts(): void {
      this.service
          .getAllCheckouts()
          .subscribe(
              (data: CheckoutsInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
