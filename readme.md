# Lord of the Rings SDK

Looking to explore the wonders of Middle Earth? Uchenna's The Lord of the Rings SDK has got you covered! With this user-friendly SDK, you can easily interact with the Lord of the Rings API to retrieve information about movies and quotes. We have support for filter, pagination, and more! Whether you're a die-hard fan or just starting your journey, the Uchenna's LotR SDK makes it easy to access the fascinating world of Middle Earth.

## Easy Installation like a Wizard of Middle Earth

To install the SDK, run:

```bash
npm install uche-lotr-sdk
```

## Compile locally, if you dare!

To compile the SDK, run:

```bash
npm run compile
```

## Run locally, at your own peril

To run the SDK locally, take a look at the [example](local_run.js) script and run:

```bash
node local_run.js
```

## Run tests

To execute the tests, run:

```bash
npm run test

```

## How to use the client like Gandalf

Import the LotrAPIClient class and create an instance with your API key:

```typescript
import { LotrSDK } from 'uche-lotr-sdk';

const apiKey = 'LOTR-API-KEY';
const LotrClient = new LotrSDK(apiKey);
```
*Note: Replace 'api-key' with your actual API key!*
*You can obtain an API key from the official [Lord of the Rings API website](https://the-one-api.dev/)*

# Quotes
### Get Quotes

```typescript
const quotes = await LotrClient.quotes();
```

### Get Quote
```typescript
const quoteId = '5cd96e05de30eff6ebccf124';
const quote = await LotrClient.quote(quoteId);
```

# Movies
### List Movies

```typescript
const movies = await LotrClient.movies();
```

### Get Movie

```typescript
const movieId = '5cd95395de30eff6ebccde5d';
const movie = await LotrClient.movie(movieId);
```
# Movie-Quotes
### Get Movie Quotes

```typescript
const movieId = '5cd95395de30eff6ebccde5d';
const quotes = await LotrClient.movieQuotes(movieId);
```

