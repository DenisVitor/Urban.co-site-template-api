import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';

export class Client {
  readonly id: string;
  name: string;
  email: string;
  avatar: string | null | undefined;
  createdAt: string | Date;
  phone: string;

  @Exclude()
  password: string;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
