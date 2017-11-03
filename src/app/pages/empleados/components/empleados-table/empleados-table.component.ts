import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosInterface } from './empleados.interface';
import { EmpleadosResponseInterface } from './empleados-response.interface';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadosAddModalComponent } from './empleados-add-modal/empleados-add-modal.component';
import { EmpleadosEditModalComponent } from './empleados-edit-modal/empleados-edit-modal.component';


@Component({
  selector: 'empleados-table',
  templateUrl: './empleados-table.html',
  styleUrls: ['./empleados-table.scss'],
})
export class EmpleadosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpersonal';
    sortOrder = 'asc';

    constructor(
      private service: EmpleadosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addEmpleadosModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editEmpleadosModalShow(empleados: EmpleadosInterface) {
      const disposable = this.dialogService.addDialog(EmpleadosEditModalComponent, empleados)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Personal';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Personal';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Personal';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Personal';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarPersonal(id)
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
        this.getAllEmpleados();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllEmpleados();
    }
    
    private getAllEmpleados(): void {
      this.service
          .getAllEmpleados()
          .subscribe(
              (data: EmpleadosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
