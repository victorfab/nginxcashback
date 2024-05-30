import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthAppState } from '../../auth/auth.reducer';
import { environment } from '../../../environments/environment';
import { PromotionsResponse } from '../../shared/intefaces/apis/promotions-response';
import { Observable } from 'rxjs';
import { addYears, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable({ providedIn: 'root' })
export class PromotionsService {
  TOKEN_CSRF = 'default';

  constructor(
    private httpClient: HttpClient,
    private _store: Store<{ auth: AuthAppState }>
  ) {}

  getPromotions(token: string): Observable<PromotionsResponse> {
    const url = environment.get_promotions;
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': token
    });
    const body = {
      customerKey: this.getClientID(),
      from: format(startOfMonth(new Date()), 'yyyy-MM-dd', {
        locale: es
      }),
      to: format(lastDayOfMonth(addYears(new Date(), 1)), 'yyyy-MM-dd', {
        locale: es
      })
    };
    return this.httpClient.post<PromotionsResponse>(url, body, { headers });
  }

  getClientID(): string {
    let buc: string | null = '';
    this._store.subscribe(state => {
      buc = state.auth.buc;
      this.TOKEN_CSRF = state.auth.token ? state.auth.token : 'x';
    });
    return buc;
  }
}
