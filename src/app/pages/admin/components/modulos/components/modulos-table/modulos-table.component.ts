import { UploadModalComponent } from './../../../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } 
from './../../../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ModulosInterface } from './modulos.interface';
import { ModulosResponseInterface } from './modulos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ModulosService } from './modulos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModulosAddModalComponent } from './modulos-add-modal/modulos-add-modal.component';
import { ModulosEditModalComponent } from './modulos-edit-modal/modulos-edit-modal.component';


@Component({
  selector: 'modulos-table',
  templateUrl: './modulos-table.html',
  styleUrls: ['./modulos-table.scss'],
})
export class ModulosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmodulo';
    sortOrder = 'asc';

    constructor(
      private service: ModulosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addModulosModalShow() {
      const disposable = this.dialogService.addDialog(ModulosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editModulosModalShow(modulos: ModulosInterface) {
      const disposable = this.dialogService.addDialog(ModulosEditModalComponent, modulos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Modulo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Modulo';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Modulo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Modulo';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarModulo(id)
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
        this.getAllModulos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllModulos();
    }
    
    private getAllModulos(): void {
      this.service
          .getAllModulos()
          .subscribe(
              (data: ModulosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
