import { UserResponseInterface } from './user-response.interface';
import { ToastrService } from 'ngx-toastr';
import { UserInterface } from './user.interface';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAddModalComponent } from './user-add-modal/user-add-modal.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';


@Component({
  selector: 'usuarios-table',
  templateUrl: './usuarios-table.html',
  styleUrls: ['./usuarios-table.scss']
})
export class UsuariosTable implements OnInit {

    data;
    filterQuery = "";
    rowsOnPage = 10;
    sortBy = "nombre";
    sortOrder = "asc";

    constructor(private service: UserService, private modalService: NgbModal, private toastrService: ToastrService, 
    private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addUserModalShow() {
      const disposable = this.dialogService.addDialog(UserAddModalComponent)
        .subscribe( data => {
          if (data) {
            console.log(11);
            this.showToast(data);
          }
        },
        error => console.log(error),
        () => console.log('Modified complete'));
    }

    editUserModalShow( user: UserInterface ) {
      const disposable = this.dialogService.addDialog(UserEditModalComponent, user)
      .subscribe( data => {
          if (data) { 
            this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    
    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        console.log('item.id a borrar', id);

        this.service.remove(id)
          .subscribe(
            (data) => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed')
          );

      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data: UserResponseInterface) {
      if (data.success) {
        this.toastrService.success(data.message);
        this.all();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.all();
    }
    
    private all(): void {
        this.service
          .all()
          .subscribe(
              (data: UserResponseInterface) => this.data = data.result,
              error => console.log(error),
              () => console.log('Get all Items complete'));
    }

    
}
