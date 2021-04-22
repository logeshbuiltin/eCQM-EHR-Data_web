import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpCustomService {

    public apiEndPoint: string =  environment.apiLocalUrl;

  constructor(private http: HttpClient) {}

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', this.apiEndPoint);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return headers;
  }

  get(url: any) {
    let headers = new HttpHeaders();
    //headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url: any, data: any) {
    let headers = new HttpHeaders();
    //headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}