import {LotrSDK} from './lotr';
import {Response} from './type/response';
import {Movie} from './type/movie';
import axios from 'axios';
import {Quote} from './type/quote';

const apiSubject = new LotrSDK('***REMOVED***');

let spy: jest.SpyInstance;

jest.mock('axios');
beforeEach(() => {
  jest.restoreAllMocks();
  spy = jest.spyOn(global, 'fetch');
});

describe('Lotr', () => {
  test('should list movies', async () => {
    const mockMoviesResponse: Response<Movie> = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccde5c',
          name: 'The Fellowship of the Ring',
          runtimeInMinutes: 178,
          budgetInMillions: 93,
          boxOfficeRevenueInMillions: 897.7,
          academyAwardNominations: 13,
          academyAwardWins: 4,
          rottenTomatoesScore: 91,
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockMoviesResponse});

    const moviesResponse = await apiSubject.movies();
    console.log(moviesResponse.docs);
    expect(moviesResponse.docs).toBeDefined();
    expect(moviesResponse.docs.length).toBeGreaterThan(0);
    expect(moviesResponse.docs[0]).toHaveProperty('name');
  });

  test('should get movie by ID', async () => {
    const mockMovieResponse: Response<Movie> = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccde56',
          name: 'The Lord of the Rings Series',
          runtimeInMinutes: 558,
          budgetInMillions: 281,
          boxOfficeRevenueInMillions: 2917,
          academyAwardNominations: 30,
          academyAwardWins: 17,
          rottenTomatoesScore: 94,
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockMovieResponse});

    const movieId = '5cd95395de30eff6ebccde5c';
    const movieResponse: Response<Movie> = await apiSubject.movie(movieId);
    const movie: Movie = movieResponse.docs[0];
    expect(movie).toBeDefined();
    expect(movie).toHaveProperty('name');
  });

  test('should get quote by ID', async () => {
    const mockQuoteResponse: Response<Quote> = {
      docs: [
        {
          _id: '5cd96e05de30eff6ebcce84c',
          dialog: "I didn't think it would end this way.",
          movie: '5cd95395de30eff6ebccde5d',
          character: '5cd99d4bde30eff6ebccfe2e',
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockQuoteResponse});
    const quoteId = '5cd96e05de30eff6ebcce84c';
    const quoteResponse: Response<Quote> = await apiSubject.quote(quoteId);
    const quote: Quote = quoteResponse.docs[0];
    expect(quote).toBeDefined();
    expect(quote).toHaveProperty('dialog');
  });

  test('should get quotes', async () => {
    const mockQuoteResponse: Response<Quote> = {
      docs: [
        {
          _id: '5cd96e05de30eff6ebcce84c',
          dialog: "I didn't think it would end this way.",
          movie: '5cd95395de30eff6ebccde5d',
          character: '5cd99d4bde30eff6ebccfe2e',
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockQuoteResponse});
    const quoteId = '5cd96e05de30eff6ebcce84c';
    const quoteResponse: Response<Quote> = await apiSubject.quotes();
    const quote: Quote = quoteResponse.docs[0];
    expect(quote).toBeDefined();
    expect(quote).toHaveProperty('dialog');
  });
});
