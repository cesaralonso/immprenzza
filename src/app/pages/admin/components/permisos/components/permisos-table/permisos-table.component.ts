import { UploadModalComponent } from './../../../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisosInterface } from './permisos.interface';
import { PermisosResponseInterface } from './permisos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisosService } from './permisos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisosAddModalComponent } from './permisos-add-modal/permisos-add-modal.component';
import { PermisosEditModalComponent } from './permisos-edit-modal/permisos-edit-modal.component';


@Component({
  selector: 'permisos-table',
  templateUrl: './permisos-table.html',
  styleUrls: ['./permisos-table.scss'],
})
export class PermisosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermiso';
    sortOrder = 'asc';

    constructor(
      private service: PermisosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addPermisosModalShow() {
      const disposable = this.dialogService.addDialog(PermisosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editPermisosModalShow(permisos: PermisosInterface) {
      const disposable = this.dialogService.addDialog(PermisosEditModalComponent, permisos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Permiso';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Permiso';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Permiso';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Permiso';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarPermiso(id)
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
        this.getAllPermisos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllPermisos();
    }
    
    private getAllPermisos(): void {
      this.service
          .getAllPermisos()
          .subscribe(
              (data: PermisosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
