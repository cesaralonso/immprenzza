import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ordenes',
  templateUrl: './ordenes.html'
})
export class OrdenesComponent implements OnInit {

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
