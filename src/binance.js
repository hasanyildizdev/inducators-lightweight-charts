export const fetchBinanceData = async (symbol, timeframe) => {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=1000`, { mode: 'cors'});
    const json = await response.json();

    const data = json
      .map((entry) => {
        try {
          return {
            time: entry[0],
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