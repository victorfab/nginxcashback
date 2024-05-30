import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetCsrfService {
  constructor(private httpClient: HttpClient) {}

  getToken = (): Observable<any> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
      }),
      observe: 'response' as 'response'
    };
    const url: string = environment.get_csrf;
    return this.httpClient.get(url, httpOptions).pipe(map(res => res));
  };
}
