import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: './users.html'
})
export class Users implements OnInit {

  constructor() {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
  
  }

}
