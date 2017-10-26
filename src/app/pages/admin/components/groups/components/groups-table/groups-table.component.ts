import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from './groups.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupsAddModalComponent } from './groups-add-modal/groups-add-modal.component';
import { GroupsEditModalComponent } from './groups-edit-modal/groups-edit-modal.component';
import { GroupsInterface } from './groups.interface';


@Component({
  selector: 'groups-table',
  templateUrl: './groups-table.html',
  styleUrls: ['./groups-table.scss']
})
export class GroupsTableComponent implements OnInit {

    data;
    filterQuery = "";
    rowsOnPage = 10;
    sortBy = "nombre";
    sortOrder = "asc";

    constructor( 
      private service: GroupsService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService,
      private dialogService: DialogService
    ) {
    }

    toInt(num: string) {
        return +num;
    }

    addGroupsModalShow() {
      const disposable = this.dialogService.addDialog(GroupsAddModalComponent)
        .subscribe( data => {
          if (data) {
            this.showToast(data);
          }
        })
    }

    editGroupsModalShow( groups: GroupsInterface ) {
      const disposable = this.dialogService.addDialog(GroupsEditModalComponent, groups)
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

        this.service.deleteGroups(id)
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
        this.getAllGroups();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllGroups();
    }
    
    private getAllGroups(): void {
        this.service
          .getAllGroups()
          .subscribe(
              (data: GroupsInterface[]) => this.data = data,
              error => console.log(error),
              () => console.log('Get all Items complete'));
    }
    
}
