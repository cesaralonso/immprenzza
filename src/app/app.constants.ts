import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  Server: string = 'http://localhost/immprenzza_api/';
  ApiUrl: string = 'api/v1/';
  ServerWithApiUrl = this.Server + this.ApiUrl;

}
