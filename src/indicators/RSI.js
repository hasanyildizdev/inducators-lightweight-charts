import './style.css'
import React, { useRef, useEffect } from 'react';
import { createChart} from 'lightweight-charts';
import {fetchBinanceData} from '../binance.js';
import { RSI } from 'technicalindicators';

function RSIcalculator(period,closeValues) {
  const result = RSI.calculate({values: closeValues , period: period});
  const rsiValues = result.map((value, index) => {
    return {
      time: Date.now() - (result.length - index) * 60 * 1000,
      value: value,
    };
  });
  return rsiValues;
}

const GraphRSI = ({symbol,timeframe}) => {
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

            const rsiLine = chartDiv.current.chart.addLineSeries({ lineWidth: 2, color: 'orange' });

            function connectWebSocket() {
                ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${timeframe}`);
        
                ws.current.onopen = () => {
                  console.log(`WebSocket connected to ${symbol}`);
                };
        
                ws.current.onmessage = async (event) => {

                  const data = await fetchBinanceData(symbol, timeframe, Date.now());
                  const rsi = RSIcalculator(14,data.map(({ close }) => close))
                  rsiLine.setData(rsi);
                }                  

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
            <h4>RSI Graph</h4>
        </div>
      </div>
    </div>
  );
};

export default GraphRSI;