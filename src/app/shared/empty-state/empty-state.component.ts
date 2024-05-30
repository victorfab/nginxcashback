import { Component, Input } from '@angular/core';
import { EmptyState, EmptyStateImage } from '../intefaces/empty-state';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {
  @Input() error: EmptyState = {
    title: '',
    message: '',
    image: EmptyStateImage.box
  };

  constructor() {}
}
