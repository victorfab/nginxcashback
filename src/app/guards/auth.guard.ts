import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAppState } from '../auth/auth.reducer';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';

export const AuthGuard = () => {
  const storeService = inject(Store<AuthAppState>);
  const router = inject(Router);
  return storeService.select('auth').pipe(
    take(1),
    tap(auth => {
      if (auth.buc !== null) {
        router.createUrlTree(['/pages/cashback']);
      } else {
        router.navigate(['/error/404']);
      }
    })
  );
};
