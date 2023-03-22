import './style.css'
import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import {fetchBinanceData} from '../binance.js';

const GraphCandle = ({symbol,timeframe}) => {
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
            const candles = chartDiv.current.chart.addCandlestickSeries();

            candles.applyOptions({
              wickUpColor: 'rgb(8,153,129)',
              upColor: 'rgb(8,153,129)',
              wickDownColor: 'rgb(242,54,69)',
              downColor: 'rgb(242,54,69)',
              borderVisible: false,
            });

            function connectWebSocket() {
                ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${timeframe}`);
                ws.current.onopen = () => {
                  console.log(`WebSocket connected to ${symbol}`);
                };
                ws.current.onmessage = async (event) => {
                    try {
                      const data = await fetchBinanceData(symbol, timeframe);
                      candles.setData(data);
                    } catch (error) {
                      console.error("Error fetching data:", error);
                    }
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
      <div ref={chartDiv} style={{width:'800px',height:'350px'}}>
        <div style={{position:' absolute', height: '100%', "zIndex":'2',"paddingLeft":'20px'}}>
            <h4>Candle Graph</h4>
        </div>
      </div>
    </div>
  );
};

export default GraphCandle;
