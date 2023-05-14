import {BaseGetSrvc} from "./base";
import {Quote} from "../type/quote";

export class MovieService extends BaseGetSrvc {
  private readonly rsrcUrl = 'movie';
  public async getQuotes(movieId: string, query?: Query): Promise<Response<Quote>> {
    const url = `${this.resourceUrl}/${movieId}/quote${query ? `?${stringify(query)}` : ''}`;

    return await this.client.get(url);
  }
  protected getRsrcName(): string {
    return this.rsrcUrl;
  }
}
