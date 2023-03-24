export const Short = (data,limit) =>{
        var highValues = [];
        var high1 = 0;
        var high2 = 0;
        var high1Position = 0;
        var high2Position = 0;
        var high1Time = 0;
        var high2Time = 0;
        var Lx = 0;
        var Ly = 0;
        var tanAlpha = 0;
        var nextPositions = [];
        var sizeNextPositions = 0;
        var i = 0;
        let trendLineData = [];

        // This finds of high values
        for (i = 0; i < data.length; i++) {  highValues[i] = data[i].high; } 
    
        // This finds High1 Candle and it's Position
        for (i = 0; i < highValues.length; i++) {
            if (highValues[i] >= high1) {
                high1 = highValues[i];
                high1Time = data[i].time;
                high1Position = i + 1;
            }
        } 
    
        // This finds High2 Candle and it's Position
        for (i = high1Position + 50; i < highValues.length; i++) {
            if (highValues[i] >= high2) {
                high2 = highValues[i];
                high2Time = data[i].time;
                high2Position = i + 1;
            }
        }

        // Trendline drawer
        try {
            // Put High1 and High2 inside trendline
            trendLineData.push({ time: high1Time, value: high1 });
            trendLineData.push({ time: high2Time, value: high2 });

            // Calculations to find Next Positions
            Ly = high1 - high2;
            Lx = high2Position - high1Position;
            tanAlpha = Ly / Lx;
            sizeNextPositions = data.length - high2Position;
            for (i = 0; i < sizeNextPositions; i++){
                var LxN = Lx + i + 1;
                var LyN = tanAlpha * LxN;
                nextPositions[i]= high1 - LyN;
                if(high2Position + i + 1 < limit) {
                     trendLineData.push({ time: data[ high2Position + i ].time, value: nextPositions[i] });
                }
            }

            console.log("high1Position: ",high1Position);
            console.log("high2Position: ",high2Position);

        } catch (error) {
            console.log(error);
        }

       return trendLineData;      
}