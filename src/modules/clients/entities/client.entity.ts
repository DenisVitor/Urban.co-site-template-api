import { Exclude } from 'class-transformer';

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
