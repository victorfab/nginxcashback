import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../shared/intefaces/apis/products-response';
import { environment } from 'src/environments/environment';
import { BodyRequest } from '../../shared/intefaces/apis/body-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(body: BodyRequest, token: string): Observable<ProductsResponse> {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': token
    });
    const url = environment.get_cards;
    return this.httpClient.post<ProductsResponse>(url, body, { headers });
  }
}
