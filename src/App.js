import './App.css'
import GraphCandle from './indicators/graphCandle';
//import GraphLine from './indicators/graphLine';
//import GraphSMA from './indicators/SMA';
//import GraphRSI from './indicators/RSI';
const symbol = 'BTCUSDT';
const timeframe = "1s";
const limit = 1000;

function App() {
  return (
    <div className="App">
        <div className='info'>
          <h5 className='info_contents'>Symbol : {symbol}</h5>
          <h5 className='info_contents'>Timeframe : {timeframe}</h5>
        </div>
        <GraphCandle symbol={symbol} timeframe={timeframe} limit={limit}/>
        {/*<GraphLine symbol={symbol} timeframe={timeframe}/>  
        <GraphSMA symbol={symbol} timeframe={timeframe}/>  
        <GraphRSI symbol={symbol} timeframe={timeframe}/> */}
    </div>
  );
}

export default App;
