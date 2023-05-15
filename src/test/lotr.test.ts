import {LotrSDK} from '../lotr';
import {Response} from '../type/response';
import {Movie} from '../type/movie';
import axios from 'axios';
import {Quote} from '../type/quote';

const apiSubject = new LotrSDK('***REMOVED***');

jest.mock('axios');
beforeEach(() => {
  jest.restoreAllMocks();
});

describe('Lotr', () => {
  test('should list movies', async () => {
    const mockMoviesResponse: Response<Movie> = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccfea8',
          name: '',
          runtimeInMinutes: 50,
          budgetInMillions: 50,
          boxOfficeRevenueInMillions: 50,
          academyAwardNominations: 50,
          academyAwardWins: 50,
          rottenTomatoesScore: 7,
        },
        {
          _id: '5c2345670eff6ebccfea8',
          name: '',
          runtimeInMinutes: 20,
          budgetInMillions: 20,
          boxOfficeRevenueInMillions: 34,
          academyAwardNominations: 50,
          academyAwardWins: 50,
          rottenTomatoesScore: 3,
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockMoviesResponse});

    const moviesResponse = await apiSubject.movies();
    expect(moviesResponse.docs).toBeDefined();
    expect(moviesResponse.docs.length).toBeGreaterThan(0);
    expect(moviesResponse.docs[0]).toHaveProperty('name');
  });

  test('should get movie by ID', async () => {
    //Arrange
    const mockMovieResponse: Response<Movie> = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccde56',
          name: 'The Lord of the Rings Series',
          runtimeInMinutes: 0,
          budgetInMillions: 0,
          boxOfficeRevenueInMillions: 0,
          academyAwardNominations: 0,
          academyAwardWins: 0,
          rottenTomatoesScore: 0,
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };
    //Mock
    (axios.get as jest.Mock).mockResolvedValue({data: mockMovieResponse});

    //Act
    const movieId = '5cd95395de30eff6ebccde5c';
    const movieResponse: Response<Movie> = await apiSubject.movie(movieId);
    const movie: Movie = movieResponse.docs[0];

    //Assert
    expect(movie).toBeDefined();
    expect(movie).toHaveProperty('name');
  });

  test('should get quote by ID', async () => {
    //Arrange
    const mockQuoteResponse: Response<Quote> = {
      docs: [
        {
          _id: '5cd96e05de30eff6ebcce84c',
          dialog: "I didn't think it would end this way.",
          movie: '',
          character: '',
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
    //Arrange
    const mockQuoteResponse: Response<Quote> = {
      docs: [
        {
          _id: '5cd96e05de30eff6ebcce84c',
          dialog: "I didn't think it would end this way.",
          movie: '',
          character: '',
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };
    //Mock
    (axios.get as jest.Mock).mockResolvedValue({data: mockQuoteResponse});

    //Act
    const quoteResponse: Response<Quote> = await apiSubject.quotes();
    const quote: Quote = quoteResponse.docs[0];
    //Assert
    expect(quote).toBeDefined();
    expect(quote).toHaveProperty('dialog');
  });

  describe('getQuotesForMovie', () => {
    test('should respond with the correct quotes', async () => {
      // Arrange
      const mockQuoteResponse: Response<Quote> = {
        docs: [
          {
            _id: '5cd95395de30eff6ebccde5d',
            dialog: 'Deagol!',
            movie: '5cd95395de30eff6ebccde5d',
            character: '',
          },
        ],
        total: 1,
        limit: 1000,
        offset: 0,
        page: 1,
      };

      //Mock
      const expectedMovieId = '5cd95395de30eff6ebccde5d';
      (axios.get as jest.Mock).mockResolvedValue({data: mockQuoteResponse});

      // Act
      const quoteResponse: Response<Quote> = await apiSubject.movieQuotes(
        expectedMovieId
      );

      // Assert
      expect(quoteResponse).toBeDefined();
      expect(quoteResponse.docs[0]).toBeDefined();
    });
  });
});
