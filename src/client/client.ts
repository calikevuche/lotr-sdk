import { clientConf } from "../type";

export class Client {
  private baseUrl = 'https://the-one-api.dev';
  private apiKey = 'API-KEY';

  public confClient(conf: clientConf) {
    this.apiKey = conf.apiPrivKey;
  }
  constructor() {}

  public async get<T>(url: string): Promise<T> {
    throw new Error();
  }
}
