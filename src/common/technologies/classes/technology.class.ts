import {ProductEntity} from "@shared/";
import type {Product} from "@shared/";

export class Technology extends ProductEntity {
  constructor(product: Product, id: Technology['id']) {
    super(product);
    this.id = id;
  }
  readonly id: string;
}
