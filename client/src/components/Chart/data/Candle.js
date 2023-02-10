import {scaleLinear} from 'd3-scale'
import { useState } from 'react';

const Candle =({ 
    currentPrice,
    date,
    open,
    close,
    high,
    low,
    width, 
    height,
    isLoading

})=>{
    // if(isLoading){
    const [pointer,setPointer]=useState({x:0,y:0})
    let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
    let SVG_CHART_HEIGHT = typeof height === "number" ? height * 1 : 0;

    const xForPrice = 75;
    const xAxisLength = SVG_CHART_WIDTH - xForPrice;
    const yAxisLength = `${SVG_CHART_HEIGHT>25?SVG_CHART_HEIGHT-25:0}`
    const x0 = 0;
    const y0 = '0';
    const dataArray = [];

        
    for (let i = 0; i < date.length; i++) {
        dataArray.push([
            date[i],
            open[i],
            close[i],
            high[i],
            low[i],
        ]);
    }

    if(`${new Date().getSeconds()}`===`59`){
        currentPrice.high = currentPrice.close
        currentPrice.low = currentPrice.close
    }

        dataArray[dataArray.length] = [
            String(currentPrice.createdAt),
            typeof dataArray[dataArray.length-1]==='object'&&!isNaN(dataArray[dataArray.length-1][2]) ?dataArray[dataArray.length-1][2]:currentPrice.open,
            currentPrice.close,
            currentPrice.high,
            currentPrice.low
        ];


        const dataYMax = dataArray.reduce(
        (max, [_, open, close, high, low]) => (Math.max(max, high,currentPrice.high)+0.0005),
        -Infinity
    );
    const dataYMin = dataArray.reduce(
        (min, [_, open, close, high, low]) => (Math.min(min, low,currentPrice.low)-0.0005),
        +Infinity
    );
    const dataYRange = dataYMax - dataYMin;
    const numYTicks = 7;
    const barPlothWidth = xAxisLength / dataArray.length>0?xAxisLength / dataArray.length:0.001;
    const numXTicks = dataArray.length>12?12:dataArray.length;
    const xValue= [];
    const generateDate = () => {
        for (let i = 0; i < 12; i++) {
          xValue.push(date[Math.round(date.length / 12) * i]);
        }
        return xValue
        };
        generateDate();
        const handleMouseMove=(e)=>{
            setPointer({
                x: e.clientX,
                y: e.clientY
            })
        }
        let windowPageYOffset = window.pageYOffset
        
if(dataArray[0][0]!==undefined&&
    !isNaN(yAxisLength)&&
    SVG_CHART_HEIGHT>0
    ){
    return(
    <div className=" candle">
        <br/>
        <div>
            <svg 
            onMouseMove={handleMouseMove}
            width={SVG_CHART_WIDTH} 
            height={SVG_CHART_HEIGHT}
            >

                {/* <text
                x={x0 + 15}
                y={y0 + yAxisLength * 0.06}
                fontSize={
                    SVG_CHART_WIDTH > 700
                    ? SVG_CHART_WIDTH * 0.01
                    : SVG_CHART_WIDTH * 0.02
                }
                stroke='#ffffff'
                >
                {name} {currentPrice.close}
                </text> */}
                <line
                x1={x0}
                y1={yAxisLength}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="gray"
                />
                <line
            
                x1={xAxisLength}
                y1={y0}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="gray"
                />

                {/* 세로선 작성 */}
                {Array.from({ length: numXTicks }).map((_, index) => {
                const x = x0 + index * (xAxisLength / numXTicks);
                return (
                    <g key={index}>
                    <line
                    
                        x1={x}
                        x2={x}
                        y1={yAxisLength}
                        y2={y0}
                        stroke='#252525'
                    ></line>

                    <text
                    
                        x={x}
                        y={SVG_CHART_HEIGHT-15}
                        textAnchor="middle"
                        stroke='#252525'
                        fontSize={SVG_CHART_WIDTH < 800 ? 8 : 10}
                    >
                        {`${xValue[index]}`.slice(14,-5)}
                    </text>
                    </g>
                );
                })}

                {/* 가로선 작성(css name => lineLight) */}
                {Array.from({ length: numYTicks }).map((_, index) => {
                const y = Number(y0 + index * (yAxisLength / numYTicks));
                const yValue = (
                    dataYMax - index * (dataYRange / numYTicks)
                );
                
                return (
                    <g key={index}>
                    <line
                    
                        x1={xAxisLength}
                        x2={x0}
                        y1={y}
                        y2={y}
                        stroke='#252525'
                        
                    ></line>

                    <text 
                        x={SVG_CHART_WIDTH - 60} y={y+10} fontSize="10" stroke='#252525' >
                        {typeof yValue === 'number'?yValue.toFixed(2).toLocaleString():0} ETH
                    </text>
                    </g>
                );
                })}
                <line
                
                    x1={pointer.x<SVG_CHART_WIDTH*0.93&&((pointer.y+windowPageYOffset)<550)?pointer.x-11:-10}
                    x2={pointer.x<SVG_CHART_WIDTH*0.93&&((pointer.y+windowPageYOffset)<550)?pointer.x-11:-10}
                    y1={0}
                    y2={SVG_CHART_HEIGHT-25}
                    stroke='#00fbff'
                    opacity={0.3}
                    ></line>

                    <line
                    x1={0}
                    x2={SVG_CHART_WIDTH-65}
                    y1={pointer.x<SVG_CHART_WIDTH*0.93&&((pointer.y+windowPageYOffset)<550)?((pointer.y+windowPageYOffset)-135):-10}
                    
                    y2={pointer.x<SVG_CHART_WIDTH*0.93&&((pointer.y+windowPageYOffset)<550)?((pointer.y+windowPageYOffset)-135):-10}
                    stroke='#00fbff'
                    opacity={0.3}
                    ></line>
                    <text
                
                    x={SVG_CHART_WIDTH-60}
                    y={pointer.x<SVG_CHART_WIDTH*0.93&&((pointer.y+windowPageYOffset)<550)?((pointer.y+windowPageYOffset)-135):-10}
                    fill='#00aab3'
                    stroke='#00aab3'
                    opacity={0.5}
                    fontSize='11px'
                > 
                {((Number(dataYMax)-Number(dataYMin))*(550-Number(pointer.y))/415+dataYMin).toFixed(2).toLocaleString()}ETH
                </text>
                {/* 캔들 구현 */}
                {dataArray.map(
                (
                    [
                    date,
                    open,
                    close,
                    high,
                    low,
                    ],
                    index
                ) => {
                    const x = x0 + index * barPlothWidth;
                    const xX = x0 + (index + 1) * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    const max = Math.max(open, close);
                    const min = Math.min(open, close);
                    const scaleY = scaleLinear()
                    .domain([dataYMin, dataYMax])
                    .range([y0, yAxisLength]);
                    const fill = close > open ? "#00A4D8" : "#b8284a";
                    return (
                    <g key={index}>
                        <line
                    
                        x1={x + (barPlothWidth - sidePadding) / 2}
                        x2={x + (barPlothWidth - sidePadding) / 2}
                        y1={!isNaN(scaleY(low))? Number(yAxisLength) - scaleY(low) : 0}
                        y2={!isNaN(scaleY(high)) ? Number(yAxisLength) - scaleY(high) : 0}
                        stroke={fill}
                        />

                        <rect
                        id={`ID_`+`${dataArray.length-index-1}`}
                        {...{ fill }}
                        x={x}
                        y={!isNaN(scaleY(max)) ?yAxisLength - scaleY(max):0}
                        width={(barPlothWidth - sidePadding)>0?barPlothWidth - sidePadding:0.001}
                        // 시가 종가 최대 최소값의 차
                        height={(scaleY(max) - scaleY(min))>1?scaleY(max) - scaleY(min):1}
                        ></rect>

                        <line
                        x1={xAxisLength+10}
                        x2={x0}
                        y1={(currentPrice.close!==undefined ? yAxisLength - scaleY(currentPrice.close) : 0)}
                        y2={(currentPrice.close!==undefined ? yAxisLength - scaleY(currentPrice.close) : 0)}
                        strokeWidth='0.1'
                        stroke={fill}
                        >
                        </line>
                        <text
                        x={SVG_CHART_WIDTH - 60}
                        y={(!isNaN(scaleY(currentPrice.close))?yAxisLength - Number(scaleY(currentPrice.close)):0)}
                        fontSize="12" 
                        fill={fill} 
                        >
                        {currentPrice.close}
                        </text>
                    </g>
                    );
                })
                //.slice(10,100)
                //offset 
                //limit
                }
            </svg>
        </div>

    </div>
    )
}}
export default Candle