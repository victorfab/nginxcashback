import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sn-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent {
  @Input() title: string = '';
  @Input() title_left: string = '';
  @Input() title_rigth: string = '';
}
