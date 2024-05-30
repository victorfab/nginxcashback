import { Component, Input } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-movement-item',
  templateUrl: './movement-item.component.html',
  styleUrls: ['./movement-item.component.scss']
})
export class MovementItemComponent {
  @Input() description: string = '';
  @Input() date: string = '';
  @Input() cashback_amount: number = 0;
  @Input() amount: number = 0;
  @Input() category: string = '';
  @Input() startPage!: Number;
  @Input() paginationLimit!: Number;
  getDateValid() {
    return format(parseISO(this.date), 'dd/MMMM/yyyy', { locale: es });
  }
}
