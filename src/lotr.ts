import {Client} from './client';
import {MovieService, QuoteService} from './service';
import {Movie} from './type';
import {Quote} from './type';
import {Query} from './type/query';
import {Response} from './type/response';

export class LotrSDK {
  private readonly clientLotr: Client;

  private readonly movieService: MovieService;

  private readonly quoteService: QuoteService;

  constructor(private apiPrvKey: string) {
    this.clientLotr = new Client(apiPrvKey);
    this.movieService = new MovieService(this.clientLotr);
    this.quoteService = new QuoteService(this.clientLotr);
  }

  /**
   *  @param {Query} query - if omitted returns all books
   *
   *  @returns {Promise<Query>} movies
   */
  public async movies(query?: Query): Promise<Response<Movie>> {
    return await this.movieService.getList(query);
  }

  /**
   *  @param {string} id
   *
   *  @returns {Promise<Response<Movie>>} movies
   */
  public async movie(id: string): Promise<Response<Movie>> {
    return this.movieService.getById(id);
  }

  /**
   *  @param {string} id
   *
   *  @returns {Promise<Response<Quote>>} quote
   */
  public async quote(id: string): Promise<Response<Quote>> {
    return this.quoteService.getById(id);
  }

  /**
   *  @param {string} movieId
   *  @param {Query} query - if omitted returns all books
   *  @param {Pagination} query.pagination - object containing {page, limit, offset}
   *  @param {Sort} query.sort - object containing {field, direction}
   *  @param {Filter[]} query.filters - an array of filters by which to include results
   *
   *  @returns {Promise<PaginatedResponse<Quote>>} quotes
   */
  public async movieQuotes(
    movieId: string,
    query?: Query
  ): Promise<Response<Quote>> {
    return this.movieService.getQuotes(movieId, query);
  }

  /**
   *  @param {Query} query - if omitted returns all books
   *  @param {Pagination} query.pagination - object containing {page, limit, offset}
   *  @param {Sort} query.sort - object containing {field, direction}
   *  @param {Filter[]} query.filters - an array of filters by which to include results
   *
   *  @returns {Promise<Response<Quote>>} quotes
   */
  public async quotes(query?: Query): Promise<Response<Quote>> {
    return await this.quoteService.getList(query);
  }
}
