export const Short = (data) =>{
    try {
        var highValues = [];
        var high1 = 0;
        var high2 = 0;
        var high1Position = 0;
        //var high2Position = 0;
        var high1Time = 0;
        var high2Time = 0;
    
        // This finds of high values
        for (let i = 0; i < data.length; i++) {
            highValues[i] = data[i].high;
        } 
    
        // This finds Top1 Candle and it's Position
        for (let i = 0; i < highValues.length; i++) {
            if (highValues[i] >= high1) {
                high1 = highValues[i];
                high1Time = data[i].time;
                high1Position = i + 1;
            }
        } 
    
        // This finds Top2 Candle and it's Position
        for (var i = high1Position + 10; i < highValues.length; i++) {
            if (highValues[i] >= high2) {
                high2 = highValues[i];
                high2Time = data[i].time;
               // high2Position = i + 1;
            }
        }
        
        // Put High1 and High2 inside trendline
        let trendLineData = [];
        trendLineData.push({ time: high1Time, value: high1 });
        trendLineData.push({ time: high2Time, value: high2 });

       return trendLineData;

    } catch (error) {
        console.log("Short error");
    }           
    
}