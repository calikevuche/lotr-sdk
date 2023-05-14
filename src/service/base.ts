import {Client} from "../client";
export abstract class BaseGetSrvc {
  protected abstract getRsrcName(): string;
  constructor(protected client: Client) {}
  public async getById<T>(id: string): Promise<T> {
    return await this.client.get(`${this.getRsrcName()}/${id}`);
  }
}
