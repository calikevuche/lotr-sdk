import {BaseGetSrvc} from './base';
import {Quote} from '../type/';
import {Response} from '../type/response';
import {Query} from '../type/query';

export class MovieService extends BaseGetSrvc {
  private readonly rsrcUrl = 'movie';
  public async getQuotes(
    movieId: string,
    query?: Query
  ): Promise<Response<Quote>> {
    const url = `${this.rsrcUrl}/${movieId}/quote${query ? `?${query}` : ''}`;
    return await this.client.get(url);
  }

  protected getRsrcName(): string {
    return this.rsrcUrl;
  }
}
