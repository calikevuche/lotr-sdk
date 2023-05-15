# LOTR SDK Design

## Client

The API client accepts a single input parameter, which is the API private key. Here is an example:
```
class Client {
  private baseUrl = 'https://the-one-api.dev';
  private version = 'v2';
  private apiKey = 'API-KEY';
  public confClient(conf: ClientConf) {....}
  constructor(private apiClientKey: string) {...}
  private formatUrl(url: string): string {...}
  public async get<T>(url: string): Promise<T> {...}
}
````

 The class contains two hardcoded variables, the base URL and the API version. While this approach limits the flexibility of the internal API, we have left it up to other developers to make this aspect more adaptable. Our approach has been to expose only the get method, which receives a URL as a string, and to provide end users with a configuration object that allows them to obtain the necessary URLs and configure the internal client. We believe that this decision provides users with the necessary flexibility to use the API in their own projects.

## Types
The foundation of this SDK is built upon a set of well-defined data types.

Movie
```
export interface Movie {...}
```
Query
```
export type Query = Partial<Response>;
```
Quote
```
export interface Quote {...}
```

Response
```
export interface Response<T> {...}
```
The foundation of this SDK is built upon a set of well-defined data types. These data types are implemented as interfaces, providing a lightweight structure that describes the properties and behavior of the objects in our API. Specifically, we have defined four interface types: Movie, Query, Quote, and Response. Each of these interfaces directly corresponds to a specific set of data that we will be interacting with in the API.

The Query type is particularly important, as it serves as a wrapper around the API responses. This allows us to provide users with optional fields for partial data retrieval, as well as support for filtering. Furthermore, the Response type includes member variables that can be used to implement pagination, although this feature is currently disabled in the SDK.

While the current set of types is suitable for many use cases, there is certainly room for extension and improvement. Time constraints have prevented us from fully exploring these possibilities, but we encourage others to build upon our work to create more robust and flexible data types as needed.

### Service

Base
```
export abstract class BaseGetSrvc {
  protected abstract getRsrcName(): string;
  constructor(protected client: Client) {...}
  public async getById<T>(id: string): Promise<T> {...}
  public async getList<T>(response?: Query): Promise<T> {...}
  }
```
Movie
````
export class MovieService extends BaseGetSrvc {
   public async getQuotes(): Promise<Response<Quote>> {...}
  protected getRsrcName(): string {...}
}
````
Quote
```
export class QuoteService extends BaseGetSrvc {
  protected getRsrcName(): string {...}
}
```

## Base

The base service is an abstract class that provides a foundation for flexible sub-classing. To promote code reusability and maintainability, we implemented both the getById and getList functions in this abstract class. The subclasses, such as the movie and quote services, have similar functionalities, and their internal operations do not differ much. However, the main difference between the getById and getList functions of the movie and quote services is the URL string, which is dynamically constructed. As a result, we implemented the getQuotes function in the movie service since the SDK needs to retrieve quotes from a specific movie, and it makes more sense to do so there. This design decision also helps to simplify the code and avoid unnecessary duplication of logic.

## SDK
Below is the software development kit (SDK) which comprises the client that accepts the API key as input from the user. To provide a streamlined experience, we have exposed only a subset of the API endpoints through the movie, movies, quote, quotes, and moviequote functions. The internal API offers more endpoints, but for this particular assignment, we have limited the scope to only the endpoints that are required. Despite this, the SDK can still be extended to support additional endpoints in the future. However, some features may have been reduced due to time constraints, which could be improved upon in future versions. Also, do note that there are restrictions on how many requests per minute can be sent to the API (100 requests every 10 minutes.)

```
export class LotrSDK {
  private readonly clientLotr: Client;
  private readonly movieService: MovieService;
  private readonly quoteService: QuoteService;

  constructor(private apiPrvKey: string) {...}

  public async movies(query?: Query): Promise<Response<Movie>> {...}

  public async movie(id: string): Promise<Response<Movie>> {...}

  public async quote(id: string): Promise<Response<Quote>> {...}

  public async movieQuotes(
    movieId: string,
    query?: Query
  ): Promise<Response<Quote>> {...}

  public async quotes(query?: Query): Promise<Response<Quote>> {...}
}
```

