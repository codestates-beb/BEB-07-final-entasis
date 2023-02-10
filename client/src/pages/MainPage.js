import LimitOrderBook from '../components/LimitOrderBook'
import Order from '../components/Order'
import Assets from "../components/Assets"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"
import { useEffect, useState, useRef } from "react"
import Historys from "../components/Historys"
import WelcomePage from "./WelcomePage"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"
import ChartWrapper from "../components/Chart/ChartWrapper"
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"

// import {FaucetWallet} from '../apis/user'

const MainPage =({setTxs,isWelcome,setIsWelcome})=>{
    const [currentPrice, setCurrentPrice] = useState({
        close : "0",
        createdAt : "0",
        high : "0",
        low : "0",
        open : "0",
        totalCurrentPrices : {enta: '0', beb: '0', leo: '0'},
        totalVolFrom : "0",
        totalVolTo : "0"
    })
    const [isLoading, setIsLoading] = useState(true);
    
    const [isEnroll,setIsEnroll] =useState({});
    const [userPosition,setUserPosition] = useState();
    const [copy, setCopy] = useState('');
    const [number, setNumber] = useState(0);
    const [walletConnected, setWalletConnected] = useState(false)
    const [isCircuitBreaker,setIsCircuitBreaker] = useState(false)
    const [tokenName, setTokenName] = useState('enta')
    const [totalChartData, setTotalChartData] = useState(false)
    const [offset, setOffset]=useState(0)
    const [limit, setLimit]=useState(10)
    const [refresh, setRefresh] = useState(false)
    const [stName, setStName] = useState('ENTAToken');
    const [companyPD, setCompanyPD] =useState([]) 

    const {chainId, account, active, activate, deactivate} = useWeb3React();
    const currentPrice_ref = useRef({});
// console.log(offset,limit)

    // ================================================================
    // Props Test
    const userAccount = useWeb3React().account;
    /* const contractAccount = '0x04794606b3065df94ef3398aA2911e56abE169B6';
    const serverAccount = '0x48c02B8aFddD9563cEF6703df4DCE1DB78A6b2Eb'; */
    const [userEth, setUserEth] = useState("")
    const [userEntaToken, setUserEntaToken] = useState("")
    const [userBebToken, setUserBebToken] = useState("")
    const [userLeoToken, setUserLeoToken] = useState("")

    const ST_Name = [
        { value: "enta", name: "ENTA" },
        { value: "beb", name: "BEB" },
        { value: "leo", name: "LEO" },
        ];
    const OPTIONS = [
        { value: "ENTAToken", name: "ENTA" },
        { value: "BEBToken", name: "BEB" },
        { value: "LEOToken", name: "LEO" },
    ];
        

    const StABI = TokenABI.abi
    const web3 = new Web3(
        window.ethereum || process.env.REACT_APP_GANACHE_NETWORK
    );
    const EntaTokenContract = new web3.eth.Contract(StABI, process.env.REACT_APP_ENTA_CA);
    const BebTokenContract = new web3.eth.Contract(StABI, process.env.REACT_APP_BEB_CA);
    const LeoTokenContract = new web3.eth.Contract(StABI, process.env.REACT_APP_LEO_CA);
    
    useEffect(() => {
        getUserEth(userAccount);
        getUserEntaToken(userAccount);
        getUserBebToken(userAccount);
        getUserLeoToken(userAccount);
        /* console.log(userEth)
        console.log(currentPrice) */
    },[currentPrice])

    async function getUserEth(account){
        if(account === undefined) setUserEth('');
        else {
            let userEth = await web3.eth.getBalance(account);
            let TransUserEth = web3.utils.fromWei(userEth);
            setUserEth(Number(TransUserEth).toFixed(4));
        }
    }

    async function getUserEntaToken(account){
        if(account === undefined) setUserEntaToken('')
        else {
            let userToken = await EntaTokenContract.methods.balanceOf(account).call();
            let TransUserToken = web3.utils.fromWei(userToken)
            setUserEntaToken(TransUserToken);
        }
    }

    async function getUserBebToken(account){
        if(account === undefined) setUserBebToken('')
        else {
            let userToken = await BebTokenContract.methods.balanceOf(account).call();
            let TransUserToken = web3.utils.fromWei(userToken)
            setUserBebToken(TransUserToken);
        }
    }

    async function getUserLeoToken(account){
        if(account === undefined) setUserLeoToken('')
        else {
            let userToken = await LeoTokenContract.methods.balanceOf(account).call();
            let TransUserToken = web3.utils.fromWei(userToken)
            setUserLeoToken(TransUserToken);
        }
    }


    // ================================================================

    let powerOfMarket = (currentPrice.open - currentPrice.close)
    useEffect(()=>{
        // console.log('set')

        let name = ' '
        if(name !== tokenName&&totalChartData===true){
            const setChartRTD=(async () => 
                {try {
                    currentPrice_ref.current = await axios.get('http://localhost:5050/rtd/'+tokenName)
                    setCurrentPrice(currentPrice_ref.current.data)
                } catch (e) {
                    console.log(e) // caught
                }
            })

        const loop = setInterval(() => {
            if(!isLoading){
                setChartRTD()
                clearInterval(loop);
                powerOfMarket = 0;
            }else{
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
            }
            clearInterval(loop);

        }, 1000);

        }
        name = tokenName;
    })

    
    // console.log(tokenName,totalChartData)
    const copyHandler = (e) => {
        copy = e;
    }
    // URL
    const origin = "http://localhost:5050/";
    const getUserURL = origin + "user/"; 
    const getCompanyURL = origin + "company/"; 
    const enroll = getUserURL + "enroll/?wallet="
    const position = getUserURL + "position/?wallet="
    const chart = origin + "chart/data"
    // API Request
    const getChart = async({ offset, limit, unit, st_name}) => {
        if(st_name===null || st_name ===undefined)return new Error('Invalid Request!')
        const resultSTChart =  axios.get(chart + `/${offset} + ${limit} + ${unit} + ${st_name}`)
        .then(res=>res)
        .then(err=>err)
        return  resultSTChart
    }
    const Position = async(wallet,offset,limit) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultPosition = await axios.get(position + wallet + `&offset=${offset}&limit=${limit}`)
        .then(res=>res.data)
        .then(err=>err)
        // console.log(resultPosition)
        setUserPosition(resultPosition)
    }
    const EnrollWallet = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultEnrollWallet =  await axios.post(enroll + wallet)
        .then(res=>res.data)
        .then(err=>err)
        setIsEnroll(resultEnrollWallet)
    }

    const pdisclosure = getCompanyURL + "pdisclosure/?name="
    useEffect(()=>{
        const CPD = async(name) => {
            if(name===null || name ===undefined)return new Error('Invalid Request!')
            const resultCPD =  axios.get(pdisclosure + name)
            .then(res=>
                setCompanyPD(res.data))
            .then(err=>err)
        }
        CPD(stName)
    },[stName])

    useEffect(()=>{
        if(account!==undefined){
        Position(account,offset,10)
        }
    },[currentPrice,account,offset,refresh])

    useEffect(()=>{
    if(account!==undefined){
    EnrollWallet(account)
    }
    },[account]);

        const onMouseEnterHandler = () => {
            document.body.style.overflow = 'unset';
        }
        
return(
    <div className="main_page" onMouseEnter={onMouseEnterHandler}>
        <WelcomePage
            isWelcome={isWelcome}
            setIsWelcome={setIsWelcome}
            account={account}
            tutorialCnt={isEnroll.cnt}
            isLoading={isLoading}
        />
        <Header 
            isEnroll={isEnroll}
            walletConnected = {walletConnected}
            setWalletConnected = {setWalletConnected}
            isLoading = {isLoading} onMouseEnter={onMouseEnterHandler}
            totalCurrentPrices={currentPrice.totalCurrentPrices}
            stName={stName}
            setStName={setStName}
            companyPD={companyPD}
            OPTIONS={OPTIONS}

        />
        <Navigator
            totalCurrentPrices={currentPrice.totalCurrentPrices}
            stName={stName}
            setStName={setStName}
            companyPD={companyPD}
            isCircuitBreaker={isCircuitBreaker}
            setIsCircuitBreaker={setIsCircuitBreaker}
            OPTIONS={OPTIONS}
        />
        <div className="main_head">
            <ChartWrapper
                ST_Name={ST_Name}
                tokenName={tokenName}
                setTokenName={setTokenName}
                currentPrice={currentPrice}
                isLoading={isLoading}
                setTotalChartData={setTotalChartData}
            />
            <LimitOrderBook
                powerOfMarket={-powerOfMarket}
                ST_CurrentPrice={currentPrice.close} 
            />
            <Order
                refresh={refresh}
                setRefresh={setRefresh}
                ST_CurrentPrice={currentPrice.close}
                userEth={userEth}
                userEntaToken={userEntaToken}
                userBebToken={userBebToken}
                userLeoToken={userLeoToken}
                tokenName={tokenName}
                totalCurrentPrices={currentPrice.totalCurrentPrices}
            />
        </div>
        <div className="main_bottom">
            <Historys
                refresh={refresh}
                setTxs={setTxs}
                setOffset={setOffset}
                setLimit={setLimit}
                walletConnected = {walletConnected}
                setWalletConnected = {setWalletConnected}
                userPosition={userPosition}
            />
            <Assets
                ST_CurrentPrice={currentPrice.close} 
                powerOfMarket={powerOfMarket}
                userEth={userEth}
                userEntaToken={userEntaToken}
                userBebToken={userBebToken}
                userLeoToken={userLeoToken}
                userPosition={userPosition}
                userAccount={userAccount}
                totalCurrentPrices={currentPrice.totalCurrentPrices}
            />
        </div>
        <Footer
            setIsCircuitBreaker={setIsCircuitBreaker}
        />
    </div>
    )
}
export default MainPage