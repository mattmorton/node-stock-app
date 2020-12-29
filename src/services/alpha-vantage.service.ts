import axios from 'axios';

const apikey = process.env.ALPHA_VANTAGE_API_KEY;
const baseUrl = `https://www.alphavantage.co/query?apikey=${apikey}`;

export const getAlphaVantage = (query: any): Promise<any> => {
  const { endpoint, symbol } = query;
  let url = baseUrl + `&function=${endpoint}&symbol=${symbol}`;

  return axios.get(url);
}