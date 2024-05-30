import { PaginationMetadata } from '../pagination-metadata';
import { Purchase } from '../purchase';
import { Errors } from '../Errors';

export interface PurchasesResponse {
  errors?: Errors[];
  purchases: Purchase[];
  paginationMetadata: PaginationMetadata;
}
