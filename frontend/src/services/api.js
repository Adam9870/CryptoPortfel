import axios from 'axios';

// singleton do api zeby nie tworzyc instancji axiosa przy kazdym callu
class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async runBacktest(requestData) {
    try {
      const response = await this.client.post('/backtest', requestData);
      return response.data;
    } catch (error) {
      console.error('Backtest API error:', error);
      throw error;
    }
  }

  async fetchBinanceData(symbol = 'BTCUSDT', interval = '1d', limit = 200) {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
      return response.data.map(kline => ({
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5]),
      }));
    } catch (error) {
      console.error('Binance API error:', error);
      throw error;
    }
  }
}

export default ApiService.getInstance();
