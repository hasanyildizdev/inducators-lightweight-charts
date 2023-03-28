export const Long = (data,limit) =>{
    var lowValues = [];
    var low1Position = 0;
    var low2Position = 0;
    var low1Time = 0;
    var low2Time = 0;
    var Lx = 0;
    var Ly = 0;
    var tanAlpha = 0;
    var nextPositions = [];
    var sizeNextPositions = 0;
    let trendLineData = [];
    var i = 0;
    let longCrossed = false;
    let low1Cordinates = [];
    let low2Cordinates = [];
    let nextCordinates = [];

    // This pulls of high values from data
    for (i = 0; i < data.length; i++) {  lowValues[i] = data[i].low; } 
    
    var low1 = data[0].low;
    var low2 = low1;

    // This finds High Point 1 and it's Position
    for (i = 0; i < lowValues.length; i++) {
        if (lowValues[i] <= low1) {
            low1 = lowValues[i];
            low1Time = data[i].time;
            low1Position = i + 1;
        }
    } 

    // This finds High Point 2 and it's Position
    for (i = low1Position +20 ; i < lowValues.length; i++) {
        if (lowValues[i] <= low2) {
            low2 = lowValues[i];
            low2Time = data[i].time;
            low2Position = i + 1;
        }
    }

    // Trendline drawer
    try {
        // Put High1 and High2 inside trendline
        low1Cordinates.push({ time: low1Time, value: low1 });
        low2Cordinates.push({ time: low2Time, value: low2 }); 

        // Calculations of finding Next Positions
        Ly = low1 - low2;
        Lx = low2Position - low1Position;
        tanAlpha = Ly / Lx;
        sizeNextPositions = data.length - low2Position;
        for (i = 0; i < sizeNextPositions; i++){
            var LxN = Lx + i + 1;
            var LyN = tanAlpha * LxN;
            nextPositions[i]= low1 - LyN;
            if(nextPositions[i] < data[low2Position + i].low ){
                nextCordinates.push({ time: data[ low2Position + i ].time, value: nextPositions[i] });
            }
            else {
                longCrossed = true;
            }
        }
        
        if(!longCrossed){
            trendLineData.push(low1Cordinates);
            trendLineData.push(low2Cordinates);
            trendLineData.push(...nextCordinates);
            console.log("Long no cross :)");
        }
        else{
            longCrossed = false;
            console.log("Long crossed!");
        }

    } catch (error) {
        console.log(error);
    }

   return {
        trendLineData : trendLineData,
        low1 : low1,
        low2 : low2,
        low1Time : low1Time,  
        low2Time : low2Time, 
   };

}
