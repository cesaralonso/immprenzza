import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadModalService } from './upload-modal.service';

import { AuthLocalstorage } from './../../../shared/auth-localstorage.service';
import { CredentialsInterface } from './../../../shared/credentials.interface';
import { Response } from '@angular/http';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

export interface ArchivoInterface {
  idreferencia: number;
  proceso: string;
  tipoarchivo: string;
  urlarchivo: string;
}

@Component({
  selector: 'upload-service-modal',
  styleUrls: [('./upload-modal.component.scss')],
  templateUrl: './upload-modal.component.html'
})
export class UploadModalComponent implements OnInit {

  private credentials: CredentialsInterface = this.authLocalstorage.getCredentials();

  id: number;
  descripcion: string;
  referencia: string;
  modalHeader: string;

  defaultPicture = 'assets/img/theme/no-photo.png';

  profile: any = {
    picture: 'assets/images/file.png',
  };

  fileUploaderOptions: NgUploaderOptions = {
    url: `http://aidihosting.com/proyectos/proyectura_api/v1/uploadImagen/${this.referencia}-`,
  };

  uploadCompled(event: any) {
    if (event.done) {
      const response = JSON.parse(event.response);
      if (response.status === 'success') {
        const archivo: ArchivoInterface = {
            idreferencia: this.id,
            proceso: this.referencia,
            tipoarchivo: response.type,
            urlarchivo: response.src,
        }
        this.service.setFile(archivo)
          .subscribe(
            (data: any) => this.showToast(data),
            error => console.log(error),
            () => this.activeModal.close());
      }
    }
  }

  showToast(data) {
    if (data.idRespuesta === 0) {
      this.toastrService.success(data.mensajeRespuesta);
    } else {
      this.toastrService.error(data.mensajeRespuesta);
    }
  }

  constructor(private service: UploadModalService, 
              private authLocalstorage: AuthLocalstorage, 
              private activeModal: NgbActiveModal,
              private toastrService: ToastrService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {
  }
}
