export interface EmptyState {
  title?: string;
  message?: string;
  image?: EmptyStateImage;
}

export enum EmptyStateImage {
  'box' = '/assets/images/empty-state/box.svg',
  'place' = '/assets/images/empty-state/place.svg',
  'document' = '/assets/images/empty-state/document.svg'
}
