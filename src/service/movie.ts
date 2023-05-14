import {BaseGetSrvc} from "./base";
import {Quote} from "../type/";
import { Response } from "../type/response";

export class MovieService extends BaseGetSrvc {
  private readonly rsrcUrl = 'movie';
  public async getQuotes(movieId: string, response?:
    Response<Quote>): Promise<Response<Quote>> {
    const url = `${this.rsrcUrl}/${movieId}/
    quote${response ? `?${response}` : ''}`;
    return await this.client.get(url);
  }
  protected getRsrcName(): string {
    return this.rsrcUrl;
  }
}
