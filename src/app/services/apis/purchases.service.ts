import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BodyRequest } from '../../shared/intefaces/apis/body-request';
import { Observable } from 'rxjs';
import { PurchasesResponse } from '../../shared/intefaces/apis/purchases-response';

@Injectable({ providedIn: 'root' })
export class PurchasesService {
  constructor(private httpClient: HttpClient) {}

  getPurchases(
    body: BodyRequest,
    token: string
  ): Observable<PurchasesResponse> {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': token
    });
    const url = environment.api_purchases;
    return this.httpClient.post<PurchasesResponse>(url, body, { headers });
  }
}
