import Chart from "../components/Chart/Chart"
import LimitOrderBook from '../components/LimitOrderBook'
import Order from '../components/Order'
import OrderList from "../components/OrderList"
import Assets
from "../components/Assets"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"
import { useEffect, useState, useRef } from "react"
import Historys from "../components/Historys"

const MainPage =()=>{
    const [stv, setStv] = useState(0);
    const [incomeRatio, setIncomeRatio] = useState(0);
    const [candleHis, setCandleHis] = useState([1.2]);
    const [volumeHis, setVolumeHis] = useState([100,[]]);
    const [candleFormatHis, setCandleFormatHis] = useState([])
    const [volumeFormatHis, setVolumeFormatHis] = useState([])
    const [formatLengthHis, setFormatLengthHis] = useState([]);
    const stv_ref = useRef(0.000001);
    const incomeRatio_ref = useRef(0.000002);
    useEffect(() => {
        const loop = setInterval(() => {
            stv_ref.current = Math.random()*(0.001-(-0.001))-0.001;
            setStv(stv_ref.current);
        if (stv_ref.current === 10||
            stv_ref.current === 10) clearInterval(loop);
        }, 10);
    }, []);
    useEffect(() => {
        const loop = setInterval(() => {
            incomeRatio_ref.current = Math.random()*(0.005-(-0.005))-0.005;
            setIncomeRatio(incomeRatio_ref.current);
        if (incomeRatio_ref.current === 10||
            incomeRatio_ref.current === 10) clearInterval(loop);
        }, 1000);
    }, []);
    useEffect(()=>{},[volumeFormatHis])
    let ST_CurrentVolume = volumeHis[0] * (1 + stv*200)*(1+incomeRatio*200)
    let ST_CurrentPrice = candleHis[candleHis.length-1] * (1 + stv)*(1+incomeRatio) * (1+ST_CurrentVolume/1000000000000)

        let candleData = [
        new Date().getHours()+ ':'+new Date().getMinutes()+ ':'+ new Date().getSeconds(),
        candleHis[0],
        candleHis[candleHis.length-1],
        candleHis.reduce((acc,cur)=>{
                if(acc<cur) return cur 
                else if(acc>=cur) return acc
            }),
        candleHis.reduce((acc,cur)=>{
            if(acc>cur) return cur 
            else if(acc<=cur) return acc
        })]
        let totalHisFrom = 0;
        let totalHisTo = 0;
        volumeHis[1].forEach(element => {totalHisTo+=element});        

        let volumeData = [
            0,
            volumeHis[0],
            totalHisTo,
            totalHisFrom
        ]    


        let CP_his =(e)=>{
            candleHis.push(e)
            if(candleHis.length >= 120 ){
                candleFormatHis.push(candleData);
                candleHis.splice(0,candleHis.length-1);
            }}
        let CV_his =(e)=>{
            volumeHis[1].push(e)

            if(volumeHis[1].length >= 120 ){
                volumeFormatHis.push(volumeData);
                totalHisTo=0
                volumeHis[1].splice(0,volumeHis[1].length-1);
            }}
        CP_his(ST_CurrentPrice)
        CV_his(ST_CurrentVolume)
        let powerOfMarket = candleFormatHis!==null&&candleFormatHis!==undefined&&candleFormatHis.length>0?(candleFormatHis[candleFormatHis.length-1][2] - candleFormatHis[candleFormatHis.length-1][1])*100:0
        

    return(
    <div className="main_page">
        <Header/>
        <Navigator/>
        <div className="main_head">
            <Chart 
            candleFormatHis={candleFormatHis}
            ST_CurrentPrice={ST_CurrentPrice} 
            candleData={candleData}
            volumeFormatHis={volumeFormatHis}
            volumeData={volumeData}

            />
            <LimitOrderBook
                powerOfMarket={powerOfMarket}
                ST_CurrentPrice={ST_CurrentPrice} 
            />
            <Order/>
        </div>
        <div className="main_bottom">
            <Historys/>
            <Assets
                ST_CurrentPrice={ST_CurrentPrice} 
            />
        </div>
        <Footer/>
    </div>
    )
}
export default MainPage