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
        let trendLineData = [];
        var i = 0;

        // This pulls of high values from data
        for (i = 0; i < data.length; i++) {  highValues[i] = data[i].high; } 
    
        // This finds High Point 1 and it's Position
        for (i = 0; i < highValues.length; i++) {
            if (highValues[i] >= high1) {
                high1 = highValues[i];
                high1Time = data[i].time;
                high1Position = i + 1;
            }
        } 
    
        // This finds High Point 2 and it's Position
        for (i = high1Position + 20; i < highValues.length; i++) {
            if (highValues[i] >= high2) {
                high2 = highValues[i];
                high2Time = data[i].time;
                high2Position = i + 1;
            }
        }

        // Trendline drawer
        try {
            // Put High1 and High2 inside trendline
            if(high1Time !== null || high1 !== null || high2Time !== null || high2Time !== null){
                trendLineData.push({ time: high1Time, value: high1 });
                trendLineData.push({ time: high2Time, value: high2 });
            }

            // Calculations of finding Next Positions
            Ly = high1 - high2;
            Lx = high2Position - high1Position;
            tanAlpha = Ly / Lx;
            sizeNextPositions = data.length - high2Position;
            for (i = 0; i < sizeNextPositions; i++){
                var LxN = Lx + i + 1;
                var LyN = tanAlpha * LxN;
                nextPositions[i]= high1 - LyN;
                if(nextPositions[i] > data[high2Position + i].high ){
                    trendLineData.push({ time: data[ high2Position + i ].time, value: nextPositions[i] });
                }
            } 

        } catch (error) {
            console.log(error);
        }

       return {
            trendLineData : trendLineData,
            high1 : high1,
            high2 : high2,
            high1Time : high1Time,  
            high2Time : high2Time, 
       };
 
}
