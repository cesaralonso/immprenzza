import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ClientesInterface } from './clientes.interface';
import { ClientesResponseInterface } from './clientes-response.interface';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesAddModalComponent } from './clientes-add-modal/clientes-add-modal.component';
import { ClientesEditModalComponent } from './clientes-edit-modal/clientes-edit-modal.component';


@Component({
  selector: 'clientes-table',
  templateUrl: './clientes-table.html',
  styleUrls: ['./clientes-table.scss'],
})
export class ClientesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcliente';
    sortOrder = 'asc';

    constructor(
      private service: ClientesService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addClientesModalShow() {
      const disposable = this.dialogService.addDialog(ClientesAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editClientesModalShow(clientes: ClientesInterface) {
      const disposable = this.dialogService.addDialog(ClientesEditModalComponent, clientes)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Cliente';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Cliente';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Cliente';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Cliente';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarCliente(id)
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
        this.getAllClientes();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllClientes();
    }
    
    private getAllClientes(): void {
      this.service
          .getAllClientes()
          .subscribe(
              (data: ClientesInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
