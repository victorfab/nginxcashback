import { Component } from '@angular/core';
import { CashbackAppState } from '../../../cashback/cashback.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  isOpenToast: boolean = true;
  constructor(private store: Store<{ cashback: CashbackAppState }>) {
    store.subscribe(state => {
      this.isOpenToast = state.cashback.isOpenToast;
    });
  }
  closeToast(): void {
    this.store.dispatch({ type: '[Cashback] Close Toast' });
    this.isOpenToast = false;
  }
}
