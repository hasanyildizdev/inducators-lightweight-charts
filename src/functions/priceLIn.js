rsiLine.createPriceLine({
    price: 50,    // The price level for the trendline
    color: 'rgba(255, 0, 0, 0.5)',   // The color of the trendline
    lineStyle: 1,       // The style of the trendline (0=plain, 1=dashed, 2=dotted)
    lineWidth: 1        // The width of the trendline
  });
  chartDiv.current.chart = createChart(chartDiv.current, 
    { 
      layout: {
        background: { color: '#171B26'},
        textColor: '#ffffff'
      },
      grid: {
        vertLines: { color: '#2A2E39' },
        horzLines: { color: '#2A2E39' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        // rightOffset: 12,
        // barSpacing: 3,
     },
    });