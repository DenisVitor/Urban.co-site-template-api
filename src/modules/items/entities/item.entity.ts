import * as crypto from 'crypto';

export class Item {
  readonly id: string;
  name: string;
  price: number;
  type: 'Shoes' | 'Cap' | 'Hoodie' | 'Shirt' | 'Coat' | 'Trousers';
  quantity: number;
  sex?: string | undefined | null;
  rate: number;
  sizes: number[];
  url_image: string[];

  constructor() {
    this.id = crypto.randomUUID();
  }
}
