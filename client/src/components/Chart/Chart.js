import React, { useState, useEffect } from "react";
import dataToArray from "../../functions/data_to_array";
import SelectBox from "../Select";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const Chart =({currentPrice, chartTermArr,defaultLimit,dataLength,term,setTermValue,isLoading,tokenName,
    setTokenName,ST_Name})=>{

    let date = dataToArray(chartTermArr,1)
    let open = dataToArray(chartTermArr,2)
    let close = dataToArray(chartTermArr,3)
    let high = dataToArray(chartTermArr,4)
    let low = dataToArray(chartTermArr,5)
    let volTo = dataToArray(chartTermArr,6)
    let volFrom = dataToArray(chartTermArr,7)

    
    const onMouseEnterHandler = () => {
        document.body.style.overflow = 'hidden';
    }

    const onMouseLeaveHandler = () => {
        document.body.style.overflow = 'unset';
    }

    function useWindowSize(){
        const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
        });
        useEffect (() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
            width: window.innerWidth*0.65,
            height: 440,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
    
        return windowSize;
    }
    // console.log(document.body.querySelector(".chart").style)
    const size = useWindowSize();



    return(
    <div className="chart" 
        onMouseEnter ={onMouseEnterHandler}
        onMouseLeave = {onMouseLeaveHandler}
        >

            <div className="chart_select_box_wrapper">
                <div className="chart_select_box">
                    <SelectBox
                        set={ST_Name}
                        value={setTokenName}
                    ></SelectBox>
                    <SelectBox 
                        set = {term}
                        value={setTermValue}
                    ></SelectBox>
                </div>

        {currentPrice!==0?
        <div className="chart_current">
            <div className="chart_current_date">
            {tokenName==='enta'?
            <h4>ENTA {currentPrice.totalCurrentPrices.enta}</h4>:
            <h5>ENTA {currentPrice.totalCurrentPrices.enta}</h5>}
            </div>
            <div className="chart_current_date">
            {tokenName==='beb'?
            <h4>BEB {currentPrice.totalCurrentPrices.beb}</h4>:
            <h5>BEB {currentPrice.totalCurrentPrices.beb}</h5>}
            </div>
            <div className="chart_current_date">
            {tokenName==='leo'?
            <h4>LEO {currentPrice.totalCurrentPrices.leo}</h4>:
            <h5>LEO {currentPrice.totalCurrentPrices.leo}</h5>}
            </div>
        </div>
        :<></>}
        </div>
                <Candle
            term={term}
            setTermValue={setTermValue}
            currentPrice={currentPrice}
            date = {date}
            open = {open}
            close = {close}
            high = {high}
            low = {low}
            width={size.width}
            height={size.height}
            defaultLimit={defaultLimit}
            dataLength={dataLength}
            ST_Name={ST_Name}
            isLoading={isLoading}
        />
        <Volume
            currentPrice={currentPrice}
            open = {open}
            close = {close}
            volTo={volTo}
            volFrom={volFrom}
            width={size.width} 
            height={size.height}
            defaultLimit={defaultLimit}
            dataLength={dataLength}
            ST_Name={ST_Name}
            isLoading={isLoading}

        />
    </div>
    )
}
export default Chart