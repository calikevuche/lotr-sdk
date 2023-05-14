import {Client} from "../client";
import {Response} from "../type/response";
export abstract class BaseGetSrvc {
  protected abstract getRsrcName(): string;
  constructor(protected client: Client) {}
  public async getById<T>(id: string): Promise<T> {
    return await this.client.get(`${this.getRsrcName()}/${id}`);
  }
  public async getList<T>(response?: Response<T>): Promise<T> {
    if (!response) {
      return await this.client.get(this.getRsrcName());
    }

    return await this.client.get(`${this.getRsrcName()}?${response}`);
  }
}
