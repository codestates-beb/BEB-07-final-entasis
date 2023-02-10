import axios from "axios";
import React, { useState, useEffect} from "react";
import dataToArray from "../../functions/data_to_array";
import Chart from "./Chart";

const ChartWrapper =({currentPrice,tokenName,setTokenName,ST_Name,setTotalChartData})=>{
    const [defaultLimit, setDefaultLimit] = useState(0);
    const [dataLength, setDataLength] = useState(0);
    const [isChartTotal, setIsChartTotal] = useState([]);
    const [chartToggle,setChartToggle] = useState(false)
    const [chartOriginArr,setChartOriginArr] = useState([]);
    const [chartArr, setChartArr]  = useState([]);
    const [chartTermArr, setChartTermArr] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [termValue, setTermValue] = useState(1);
    const [offset,setOffset]=useState(1500);
    const [limit, setLimit]=useState(10000);
    const [total,setTotal] = useState(0);
    const [termArrLength,setTermArrLength] = useState(2000);

    const term = [
        { value: "1", name: "1 minutes" },
        { value: "15", name: "15 minutes" },
        { value: "60", name: "1 hours" },
        { value: "240", name: "4 hours" },
        { value: "1440", name: "1 day" },
        { value: "10080", name: "1 week" },
        ]

useEffect(()=>{
    let limitChartArr=[];

    const origin = 'http://localhost:5050/chart/'
        const setChartTotal=(async(offset,limit,tokenName) => 
        {try {
            // setIsLoading(true)
            const resultTotal = await axios.get(origin + tokenName + `?offset=${offset}&limit=${limit}`)
            setTimeout(()=>{
                (resultTotal.data.priceinfo.map(e=>limitChartArr.push(Object.values(e))))
                setIsChartTotal(limitChartArr)
                setTotalChartData(true)
                // setIsLoading(false)
                // setOffset(limit/100)
                // total=resultTotal.data.totalLength-1;
            },1000)
        } catch (e) {
        console.log(e) 
        }
    })
    setChartTotal(offset,limit,tokenName)
    // console.log(tokenName)

},[tokenName])

    useEffect(()=>{
        setChartOriginArr(isChartTotal)
        
    },[isChartTotal,tokenName])

    useEffect(() => {
        const loop = setInterval(() => {
            if(`${new Date().getSeconds()}`===`0`){
                let index = chartArr[chartArr.length-1]!==undefined?chartArr[chartArr.length-1][0]+1:undefined
                let createdAtB = currentPrice.createdAt;
                let openB= typeof chartArr[chartArr.length-1]==='object'&&!isNaN(chartArr[chartArr.length-1][3]) ?chartArr[chartArr.length-1][3]:currentPrice.open;
                let closeB= currentPrice.close;
                let highB= currentPrice.high;
                let lowB= currentPrice.low;
                let totalVolToB= currentPrice.totalVolTo;
                let totalVolFromB= currentPrice.totalVolFrom;
                setChartOriginArr([...chartOriginArr,[
                    index,
                    createdAtB,
                    openB,
                    closeB,
                    highB,
                    lowB,
                    totalVolToB,
                    totalVolFromB,
                ]]);
            }  

        clearInterval(loop);
        }, 1000);
    }, [new Date().getSeconds()]);

        

    let setByTime = []
    let setByTimeNewArr = []

    useEffect(()=>{

        let cnt = 0
        let termNum = 0;
        // console.log(`${termNum}`,`${termValue}`)
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        if(`${termNum}`!==`${termValue}`){
            for(let i = 0 ; i<chartOriginArr.length; i++){
                setByTime.push(chartOriginArr[i])
                // console.log(i%termValue)
                if(i%Number(termValue)=== 0){
                    cnt++
                    let setByTimeArr = [
                        cnt,
                        dataToArray(setByTime,1)[0],
                        Number(dataToArray(setByTime,2)[0]),
                        Number(dataToArray(setByTime,3)[setByTime.length-1]),
                        Number(Math.max(...dataToArray(setByTime,4))),
                        Number(Math.min(...dataToArray(setByTime,5))),
                        Number(arrSum(dataToArray(setByTime,6))),
                        Number(arrSum(dataToArray(setByTime,7))),
                    ]
                setByTimeNewArr.push(setByTimeArr)
                setByTime=[]
            }
            setChartArr(setByTimeNewArr)
            }
            termNum=termValue
            setTermArrLength(setByTimeNewArr.length)
            setDataLength(setByTimeNewArr.length/2)
        }    
    },[termValue,chartOriginArr])

    useEffect(()=>{
        setChartTermArr(chartArr
        .slice(dataLength>termArrLength*0.03?dataLength:termArrLength*0.03, 
            defaultLimit>termArrLength*0.03?defaultLimit:termArrLength*0.03))
            setDefaultLimit(termArrLength)
        // console.log(dataLength,defaultLimit)

    },[chartArr,dataLength,defaultLimit,termValue])
    useEffect(()=>{
        setChartTermArr(chartArr)

    },[chartArr])
    // let posX = 0;
    // let posY = 0;
    
    // let originalX = 0;
    // let originalY = 0;
    // const dragStartHandler = e => {
    //     // const img = new Image();
    //     // e.dataTransfer.setDragImage(img, 0, 0);
    //     posX = e.clientX;
    //     posY = e.clientY;
        
    //     originalX = e.target.offsetLeft;
    //     originalY = e.target.offsetTop;
    //     console.log(e.clientX);
    //     console.log(e.clientY);
        
    //     console.log(e.target.offsetLeft);
    //     console.log(e.target.offsetTop);
    //     };
    // const dragHandler = e => {
    //     e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    //     e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    //     posX = e.clientX;
    //     posY = e.clientY;
    //     e.target.style.left = `${originalX}px`;
    //     e.target.style.top = `${originalY}px`;
    //     };
    // const dragEndHandler = e => {
    //     e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    //     e.target.style.top = `${e.target.offsetLeft + e.clientY - posY}px`;
    //     };    

return(
    <div className="chart_wrapper"
        // onMouseDown={()=>{
        //     window.onmousedown = e =>
        //     console.log(e.clientX)

        // }}
        // onMouseUp={()=>{
        //     window.onmouseup = e =>
        //     console.log(e.clientX)

        // }}

        // onDrag={dragStartHandler}
        onWheel={() => {
            window.onwheel = function (e) {
                let set = dataLength*0.05
                if(document.body.style.overflow === 'hidden'){
                e.deltaY> 0
                ? setDataLength(dataLength < 1 ? dataLength + 0 : dataLength - set)
                : setDataLength(dataLength > defaultLimit-100 ? dataLength + 0  : dataLength + set)
            }
            };
        }} 
        >
        {isLoading?<img className="loading" src={require('../../assets/images/Infinity.gif')} alt='loading'/>:
        <Chart
        tokenName = {tokenName} 
        setTokenName = {setTokenName} 
        ST_Name={ST_Name}
        term={term}
        setTermValue={setTermValue}
        chartTermArr = {chartTermArr}
        currentPrice={currentPrice}
        dataLength={dataLength}
        defaultLimit={defaultLimit}
        isLoading={isLoading}
        />
        }
    </div>
    )
}
export default ChartWrapper