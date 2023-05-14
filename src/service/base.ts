import {Client} from '../client';
import {Query} from '../type/query';
export abstract class BaseGetSrvc {
  protected abstract getRsrcName(): string;
  constructor(protected client: Client) {}
  public async getById<T>(id: string): Promise<T> {
    return await this.client.get(`${this.getRsrcName()}/${id}`);
  }
  public async getList<T>(response?: Query): Promise<T> {
    if (!response) {
      return (await this.client.get(this.getRsrcName())) as Promise<T>;
    }

    return await this.client.get(`${this.getRsrcName()}?${response}`);
  }
}
