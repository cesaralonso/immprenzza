import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TrabajosInterface } from './trabajos.interface';
import { TrabajosResponseInterface } from './trabajos-response.interface';
import { Component, OnInit } from '@angular/core';
import { TrabajosService } from './trabajos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajosAddModalComponent } from './trabajos-add-modal/trabajos-add-modal.component';
import { TrabajosEditModalComponent } from './trabajos-edit-modal/trabajos-edit-modal.component';


@Component({
  selector: 'trabajos-table',
  templateUrl: './trabajos-table.html',
  styleUrls: ['./trabajos-table.scss'],
})
export class TrabajosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtrabajo';
    sortOrder = 'asc';

    constructor(
      private service: TrabajosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addTrabajosModalShow() {
      const disposable = this.dialogService.addDialog(TrabajosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editTrabajosModalShow(trabajos: TrabajosInterface) {
      const disposable = this.dialogService.addDialog(TrabajosEditModalComponent, trabajos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Trabajo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Trabajo';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Trabajo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Trabajo';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarTrabajo(id)
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
        this.getAllTrabajos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllTrabajos();
    }
    
    private getAllTrabajos(): void {
      this.service
          .getAllTrabajos()
          .subscribe(
              (data: TrabajosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
