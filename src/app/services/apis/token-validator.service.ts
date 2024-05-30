import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenValidator } from 'src/app/shared/intefaces/apis/token-validator';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TokenValidatorService {
  constructor(private httpClient: HttpClient) {}

  getValidateToken(tkn: string): Observable<TokenValidator> {
    const headers = new HttpHeaders({
      Authorization: tkn
    });
    const url: string = environment.session;
    return this.httpClient.get<TokenValidator>(url, { headers });
  }
}
