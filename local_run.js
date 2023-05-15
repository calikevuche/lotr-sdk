const {LotrSDK} = require('./build/src/lotr');

const apiKey = '***REMOVED***';
const api = new LotrSDK(apiKey);

(async () => {
  try {
    const quote = await api.movie('5cd95395de30eff6ebccde5d');
    console.log(quote);
  } catch (error) {
    console.log(error);
  }
})();
