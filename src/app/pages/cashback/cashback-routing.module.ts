import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashbackComponent } from './cashback.component';

const routes: Routes = [
  {
    path: '',
    component: CashbackComponent,
    children: [
      {
        path: 'summary',
        loadChildren: () =>
          import('./../summary/summary.module').then(m => m.SummaryModule),
        data: { title: 'Summary' }
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('./../promotions/promotions.module').then(
            m => m.PromotionsModule
          ),
        data: { title: 'Promotions' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbackRoutingModule {}
