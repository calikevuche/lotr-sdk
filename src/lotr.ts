import {Client} from './client';

export class LotrSDK {
  private readonly clientLotr: Client;

  constructor(private apiPrvKey: string) {
    this.clientLotr = new Client();
  }
}
