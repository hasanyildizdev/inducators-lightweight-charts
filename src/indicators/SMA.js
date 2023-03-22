import './style.css'
import React, { useRef, useEffect } from 'react';
import { createChart} from 'lightweight-charts';
import {fetchBinanceData} from '../binance.js';
import { SMA } from 'technicalindicators';

function SMAcalculator(period,closeValues) {
  const result = SMA.calculate({ period: period, values: closeValues });
  const smiValues = result.map((value, index) => {
    return {
      time: Date.now() - (result.length - index) * 60 * 1000,
      value: value,
    };
  });
  return smiValues;
}

const GraphSMA = ({symbol,timeframe}) => {
    const chartDiv = useRef(null);
    const ws = useRef(null);

    useEffect(() => {
        if(!chartDiv.current.chart){
            chartDiv.current.chart = createChart(chartDiv.current, 
            { 
              layout: {
                background: {
                  color: '#171B26'
                },
                textColor: '#ffffff'
              },
              grid: {
                vertLines: { color: '#2A2E39' },
                horzLines: { color: '#2A2E39' },
              },
            })

            const smaLine = chartDiv.current.chart.addLineSeries({ lineWidth: 2, color: 'orange' });

            function connectWebSocket() {
                ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${timeframe}`);
        
                ws.current.onopen = () => {
                  console.log(`WebSocket connected to ${symbol}`);
                };
        
                ws.current.onmessage = async (event) => {
                    const data = await fetchBinanceData(symbol, timeframe,Date.now());
                    smaLine.setData(SMAcalculator(14,data.map(({ close }) => close)));
                };

                return () => {
                    ws.close();
                };
            }
            connectWebSocket();
        }
      },[symbol,timeframe]);

  return (
    <div className='bg'>
      <div ref={chartDiv} style={{width:'800px',height:'250px'}}>
          <div style={{position:' absolute', height: '100%', "zIndex":'2',"paddingLeft":'20px'}}>
            <h4>SMA Graph</h4>
          </div>
      </div>
    </div>
  );
};

export default GraphSMA;