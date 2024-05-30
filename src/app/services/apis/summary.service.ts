import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SummaryResponse } from '../../shared/intefaces/apis/summary-response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BodyRequest } from '../../shared/intefaces/apis/body-request';

@Injectable({ providedIn: 'root' })
export class SummaryService {
  constructor(private httpClient: HttpClient) {}

  getSummary(body: BodyRequest, token: string): Observable<SummaryResponse> {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': token
    });
    const url = environment.api_summary;
    return this.httpClient.post<SummaryResponse>(url, body, { headers });
  }
}
