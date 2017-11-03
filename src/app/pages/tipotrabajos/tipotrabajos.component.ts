import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tipotrabajos',
  templateUrl: './tipotrabajos.html'
})
export class TipoTrabajosComponent implements OnInit {

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
