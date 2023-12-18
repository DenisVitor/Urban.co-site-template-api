export class Item {
  readonly id: string;
  name: string;
  price: number;
  type: 'Shoes' | 'Cap' | 'Hoodie' | 'Shirt' | 'Coat' | 'Trousers';
  quantity: number;
  rate: number;
  sizes: number[];
  url_image: string[];

  constructor() {
    this.id = crypto.randomUUID();
  }
}
