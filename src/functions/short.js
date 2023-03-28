export const Short = (data,limit) =>{
    let highValues = [];
    let high1 = 0;
    let high2 = 0;
    let high1Position = 0;
    let high2Position = 0;
    let high1Time = 0;
    let high2Time = 0;
    let Lx = 0;
    let Ly = 0;
    let tanAlpha = 0;
    let nextPositions = [];
    let sizeNextPositions = 0;
    let trendLineData = [];
    let i = 0;
    let shortCrossed = false;
    let high1Cordinates = [];
    let high2Cordinates = [];
    let nextCordinates = [];
    let exitWhile = false;
    let crossHigh1Positions = [-1];
    let shortTrendlineFound = false;
    let lastHigh1 = 0;

        // This pulls of high values from data
        for (i = 0; i < data.length; i++) {  highValues[i] = data[i].high; } 

/*         let lastHigh1 = 995;
 
        if(lastHigh1 >= high2Position) {
            shortTrendlineFound = false;
            exitWhile = true;
        } 

        // This finds High Point 1 and it's Position
        for (i = lastHigh1 + 1; i < highValues.length; i++) {
            if (highValues[i] >= high1) {
                high1 = highValues[i];
                high1Time = data[i].time;
                high1Position = i + 1;
            }
        } 

        // This finds High Point 2 and it's Position
        for (i = high1Position ; i < highValues.length; i++) {
            if (highValues[i] >= high2) {
                high2 = highValues[i];
                high2Time = data[i].time;
                high2Position = i + 1;
            }
        }

        console.log(high1Position);
        console.log(high2Position);
        console.log(highValues.length);
 */
     while(!exitWhile){

        // This finds High Point 1 and it's Position
        for (i = lastHigh1 + 1; i < highValues.length; i++) {
            if (highValues[i] >= high1) {
                high1 = highValues[i];
                high1Time = data[i].time;
                high1Position = i + 1;
            }
        } 
    
        // This finds High Point 2 and it's Position
        for (i = high1Position + 3; i < highValues.length; i++) {
            if (highValues[i] >= high2) {
                high2 = highValues[i];
                high2Time = data[i].time;
                high2Position = i + 1;
            }
        }
    
        // Calculations of finding Next Positions
        Ly = high1 - high2;
        Lx = high2Position - high1Position;
        tanAlpha = Ly / Lx;
        sizeNextPositions = data.length - high2Position;
        for (i = 0; i < sizeNextPositions; i++){
            let LxN = Lx + i + 1;
            let LyN = tanAlpha * LxN;
            nextPositions[i]= high1 - LyN;
            if(nextPositions[i] > data[high2Position + i].high ){
                nextCordinates.push({ time: data[ high2Position + i ].time, value: nextPositions[i] });
            }
            else {
                nextCordinates = [];
                shortCrossed = true;
            }
        }
    
        // If trenline crossed
        if(shortCrossed) {
            crossHigh1Positions.push(high1Position);
            shortCrossed = false;
            shortTrendlineFound = false;
            console.log(`crossed`);
        }
        // Short trendline found
        else {
            high1Cordinates = { time: high1Time, value: high1 };
            high2Cordinates = { time: high2Time, value: high2 };
            shortTrendlineFound = true;
            exitWhile = true;
        }

        lastHigh1 = crossHigh1Positions[crossHigh1Positions.length-1];
        // Reached to end but couldn't find trendline
        if(lastHigh1 >= highValues.length || high1Position >= highValues.length) {
            shortTrendlineFound = false;
            exitWhile = true;
        }
    }

    if(shortTrendlineFound) {
        trendLineData.push(high1Cordinates);
        trendLineData.push(high2Cordinates);
        trendLineData.push(...nextCordinates);
        console.log("Short trendline created successfully!");
    }
    else {
        console.log("Short trendline not found :(");
    } 

    return {
        trendLineData : trendLineData,
        high1 : high1,
        high2 : high2,
        high1Time : high1Time,  
        high2Time : high2Time, 
    };

}
