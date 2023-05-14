import {Client} from '../client';

let client: Client;
beforeEach(() => {
  client = new Client('API_KEY');
});

function mockFetch(returnValue: unknown) {
  global.fetch = jest.fn(() => Promise.resolve(returnValue)) as jest.Mock;
}

describe('Client', () => {
  test('get should succeed when response is ok', async () => {
    mockFetch({
      ok: true,
      json: () => Promise.resolve([{name: 'The Fellowship of the Ring'}]),
    });
    const actual = await client.get('movie');
    expect(actual).toEqual([{name: 'The Fellowship of the Ring'}]);
  });

  test('get should throw when response is not ok', async () => {
    mockFetch({
      ok: false,
      statusText: 'Failed for some reason!',
    });
    await expect(client.get('movie')).rejects.toThrow(
      'Failed for some reason!'
    );
  });
});
