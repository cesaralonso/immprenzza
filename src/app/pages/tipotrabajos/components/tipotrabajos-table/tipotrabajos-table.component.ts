import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TipoTrabajosInterface } from './tipotrabajos.interface';
import { TipoTrabajosResponseInterface } from './tipotrabajos-response.interface';
import { Component, OnInit } from '@angular/core';
import { TipoTrabajosService } from './tipotrabajos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoTrabajosAddModalComponent } from './tipotrabajos-add-modal/tipotrabajos-add-modal.component';
import { TipoTrabajosEditModalComponent } from './tipotrabajos-edit-modal/tipotrabajos-edit-modal.component';


@Component({
  selector: 'tipotrabajos-table',
  templateUrl: './tipotrabajos-table.html',
  styleUrls: ['./tipotrabajos-table.scss'],
})
export class TipoTrabajosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtipotrabajo';
    sortOrder = 'asc';

    constructor(
      private service: TipoTrabajosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addTipoTrabajosModalShow() {
      const disposable = this.dialogService.addDialog(TipoTrabajosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editTipoTrabajosModalShow(tipotrabajos: TipoTrabajosInterface) {
      const disposable = this.dialogService.addDialog(TipoTrabajosEditModalComponent, tipotrabajos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a TipoTrabajo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'TipoTrabajo';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de TipoTrabajo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'TipoTrabajo';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarTipoTrabajo(id)
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
        this.getAllTipoTrabajos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllTipoTrabajos();
    }
    
    private getAllTipoTrabajos(): void {
      this.service
          .getAllTipoTrabajos()
          .subscribe(
              (data: TipoTrabajosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
