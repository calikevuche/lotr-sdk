import {ClientConf} from '../type';

export class Client {
  private baseUrl = 'https://the-one-api.dev';
  private version = 'v2';
  private apiKey = 'API-KEY';

  public confClient(conf: ClientConf) {
    this.apiKey = conf.apiPrivKey;
  }
  constructor(private apiClientKey: string) {
    this.apiKey = apiClientKey;
  }

  private formatUrl(url: string): string {
    return `${this.baseUrl}/${this.version}/${url}`;
  }
  public async get<T>(url: string): Promise<T> {
    const response = await fetch(this.formatUrl(url), {
      headers: {Authorization: `Bearer ${this.apiKey}`},
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
}
