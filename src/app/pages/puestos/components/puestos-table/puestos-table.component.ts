import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PuestosInterface } from './puestos.interface';
import { PuestosResponseInterface } from './puestos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PuestosService } from './puestos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuestosAddModalComponent } from './puestos-add-modal/puestos-add-modal.component';
import { PuestosEditModalComponent } from './puestos-edit-modal/puestos-edit-modal.component';


@Component({
  selector: 'puestos-table',
  templateUrl: './puestos-table.html',
  styleUrls: ['./puestos-table.scss'],
})
export class PuestosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpuesto';
    sortOrder = 'asc';

    constructor(
      private service: PuestosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addPuestosModalShow() {
      const disposable = this.dialogService.addDialog(PuestosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editPuestosModalShow(puestos: PuestosInterface) {
      const disposable = this.dialogService.addDialog(PuestosEditModalComponent, puestos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Puesto';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Puesto';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Puesto';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Puesto';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarPuesto(id)
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
        this.getAllPuestos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllPuestos();
    }
    
    private getAllPuestos(): void {
      this.service
          .getAllPuestos()
          .subscribe(
              (data: PuestosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
