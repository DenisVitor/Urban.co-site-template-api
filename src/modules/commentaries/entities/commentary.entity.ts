import * as crypto from 'crypto';

export class Commentary {
  readonly id: string;
  commentary: string;
  rating: number;
  clientId: string;
  itemId: string;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
