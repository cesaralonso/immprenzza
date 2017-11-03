import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trabajos',
  templateUrl: './trabajos.html'
})
export class TrabajosComponent implements OnInit {

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
