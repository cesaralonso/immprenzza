import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AbonosInterface } from './abonos.interface';
import { AbonosResponseInterface } from './abonos-response.interface';
import { Component, OnInit } from '@angular/core';
import { AbonosService } from './abonos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbonosAddModalComponent } from './abonos-add-modal/abonos-add-modal.component';
import { AbonosEditModalComponent } from './abonos-edit-modal/abonos-edit-modal.component';


@Component({
  selector: 'abonos-table',
  templateUrl: './abonos-table.html',
  styleUrls: ['./abonos-table.scss'],
})
export class AbonosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idabono';
    sortOrder = 'asc';

    constructor(
      private service: AbonosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addAbonosModalShow() {
      const disposable = this.dialogService.addDialog(AbonosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editAbonosModalShow(abonos: AbonosInterface) {
      const disposable = this.dialogService.addDialog(AbonosEditModalComponent, abonos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Abono';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Abono';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Abono';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Abono';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarAbono(id)
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
        this.getAllAbonos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllAbonos();
    }
    
    private getAllAbonos(): void {
      this.service
          .getAllAbonos()
          .subscribe(
              (data: AbonosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
