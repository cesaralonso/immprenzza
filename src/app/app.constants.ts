import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  Server: string = 'http://localhost:3000/';
  ApiUrl: string = '';
  ServerWithApiUrl = this.Server + this.ApiUrl;

}
