export const fetchBinanceData = async (symbol, timeframe, limit) => {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=${limit}`, { mode: 'cors'});
    //https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1s&limit=1
    const json = await response.json();

    const data = json
      .map((entry) => {
       // console.log(entry[0].toString().slice(0, 10));
        try {
          return {
            time: parseInt(entry[0].toString().slice(0, 10)),
            open: parseFloat(entry[1]),
            high: parseFloat(entry[2]),
            low: parseFloat(entry[3]),
            close: parseFloat(entry[4]),
            volume: parseFloat(entry[5]),
          }; 
        } catch (error) {
          console.error("Error parsing data:", error, entry);
          return null;
        }
      })
      .filter((entry) => entry !== null)
      .sort((a, b) => a.time - b.time);
  
    return data;
  };
