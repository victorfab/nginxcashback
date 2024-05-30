import { AfterViewInit, Component } from '@angular/core';
import { FlameLoaderService } from '@ngx-mxflame/atoms/loader-overlay';
import { TokenSsoFacadeService } from '../services/facades/token-sso-facade.service';
import { GetCsrfService } from '../services/apis/csrf.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthAppState } from './auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit {
  constructor(
    private _loader: FlameLoaderService,
    private _tokenSsoFacadeService: TokenSsoFacadeService,
    private _tokenCsrfFacadeService: GetCsrfService,
    private _store: Store<AuthAppState>,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    const dialog = this._loader.open();
    if (!this._tokenSsoFacadeService._token) {
      const responseToken = this._tokenSsoFacadeService.validationToken();
      const validationToken = async () => {
        await firstValueFrom(responseToken)
          .then(resp => {
            console.log(resp);
            const SESSION_DATA = resp.SecObjRec.SecObjInfoBean.SecObjData;
            const BUC = SESSION_DATA.find(data => data.SecObjDataKey === 'buc');
            const BUCANOM = SESSION_DATA.find(data => data.SecObjDataKey = 'redirectUrl'); //variable para buc anonimizado
            if (BUC) {
              this._tokenCsrfFacadeService.getToken().subscribe(response => {
                const xsrfc = response.body;
                if (xsrfc && xsrfc['token']) {
                  const csrf = xsrfc['token'];
                  this._store.dispatch({
                    type: '[Auth] Set Buc',
                    buc: BUC.SecObjDataValue,
                    bucAnonimo: BUCANOM?.SecObjDataValue,
                    token: csrf
                  });
                  dialog.close();
                  this._router.navigateByUrl('pages/cashback');
                }
              });
            } else {
              dialog.close();
              this._router.navigateByUrl('pages/error/401');
            }
          })
          .catch(reason => {
            dialog.close();
            this._router.navigateByUrl('pages/error/401');
          });
      };
      validationToken();
    }
  }
}
