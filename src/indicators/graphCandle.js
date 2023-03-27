import './style.css'
import React, { useRef, useEffect } from 'react';
import { createChart , CrosshairMode } from 'lightweight-charts';
import { fetchBinanceData } from '../binance.js';
import { Short } from '../functions/short';
import { Long } from '../functions/long';

const GraphCandle = ({ symbol, timeframe, limit }) => {
  const chartDiv = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    if (!chartDiv.current.chart) {
      chartDiv.current.chart = createChart(chartDiv.current,
        {
          layout: {
            background: { color: '#171B26' },
            textColor: '#ffffff'
          },
          grid: {
            vertLines: { color: '#2A2E39' },
            horzLines: { color: '#2A2E39' },
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: true,
          },
          crosshair: {
            mode: CrosshairMode.Normal, 
          }
        });

      const candles = chartDiv.current.chart.addCandlestickSeries();

      const shortLine = chartDiv.current.chart.addLineSeries({
        color: 'yellow',
        lineWidth: 2,
        lineStyle: 0,
      });
      const longLine = chartDiv.current.chart.addLineSeries({
        color: '#66ff00',
        lineWidth: 2,
        lineStyle: 0,
      });

      candles.applyOptions({
        wickUpColor: 'rgb(8,153,129)',
        upColor: 'rgb(8,153,129)',
        wickDownColor: 'rgb(242,54,69)',
        downColor: 'rgb(242,54,69)',
        borderVisible: false,
      });

      function connectWebSocket() {
        ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);

        ws.current.onopen = () => {
          console.log(`WebSocket connected to ${symbol}`);
        };

        ws.current.onmessage = async (event) => {
          try {
            const data = await fetchBinanceData(symbol, timeframe, limit);
            candles.setData(data);
            
            var short = Short(data,limit);
            var long = Long(data,limit);
            
            if( long.low1 > 0 && long.low2 > 0 && long.low1Time > 0 && long.low2Time > 0 ){
                longLine.setData(long.trendLineData)
                const markersLong  = [
                  {
                      time: long.low1Time,
                      position: 'belowBar',
                      color: '#66ff00',
                      shape: 'arrowUp',
                      text: 'Low1',
                  },
                  {
                      time: long.low2Time,
                      position: 'belowBar',
                      color: '#66ff00',
                      shape: 'arrowUp',
                      text: 'Low2',
                  },
              ];
              longLine.setMarkers(markersLong);
            }
            else { 
              longLine.setData([]);
              console.log("Long variables has 0 value");
            }

            if( short.high1 > 0 && short.high2 > 0 && short.high1Time > 0 && short.high2Time > 0 ) {
                shortLine.setData(short.trendLineData);
                const markersShort  = [
                  {
                      time: short.high1Time,
                      position: 'aboveBar',
                      color: '#FFFF00',
                      shape: 'arrowDown',
                      text: 'High1',
                  },
                  {
                      time: short.high2Time,
                      position: 'aboveBar',
                      color: '#FFFF00',
                      shape: 'arrowDown',
                      text: 'High2',
                  },
              ]; 
              shortLine.setMarkers(markersShort);
            } else { 
              shortLine.setData([]);
              console.log("Short variables has 0 value");
            }

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };


        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setTimeout(() => {
            connectWebSocket();
          }, 1000); // Try to reconnect after 1 second
        };

        return () => {
          ws.close();
        };
      }
      connectWebSocket();
    }
  }, [symbol, timeframe, limit]);

  return (
    <div className='bg'>
      <div ref={chartDiv} style={{ width: '800px', height: '450px' }}>
        <div style={{ position: ' absolute', height: '100%', "zIndex": '2', "paddingLeft": '20px' }}>
          <h4> ADAM TRADE </h4>
        </div>
      </div>
    </div>
  );
};

export default GraphCandle;
