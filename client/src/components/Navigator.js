import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react"
import Modal from "react-modal"
import { Link } from "react-router-dom";
import { Tutorial } from "../apis/user";
import '../assets/css/main.css';
import SelectBox from './Select';
import Tutorials from "./Tutorials";

const Navigator =({isCircuitBreaker,setIsCircuitBreaker,stName,setStName,companyPD,OPTIONS,totalCurrentPrices
})=>{
    const [pdModalIsOpen, setPdModalIsOpen] = useState(false);
    const [tutorialsClicked,setTutorialsClicked] = useState(false)
    const [coorpName,setCoorpName] = useState('')
    // const [isDate, setIsDate] = useState(0);
    let time = new Date()
    let date = (59-time.getMinutes())%5+":"+(59-time.getSeconds());
    let [circuitBreakerTimer,setCircuitBreakerTimer] = useState(60)
    
    let i = 60 ;

    useEffect(()=>{
        if(isCircuitBreaker){
        const setTime = setInterval(()=>{
            if(i>0){
                i--
                setCircuitBreakerTimer(i)
            }else{
                clearInterval(setTime)
                setIsCircuitBreaker(false)
            }
        },1000)}
    },[isCircuitBreaker,i])

const SelectCoorp = (e) =>{
    if(e==='ENTAToken')return totalCurrentPrices.enta
    if(e==='BEBToken')return totalCurrentPrices.beb
    if(e==='LEOToken')return totalCurrentPrices.leo
}   
    useEffect(()=>{
        setCoorpName(SelectCoorp(stName))
    })
    // const countNumber=(e)=>{
    //     return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    // }
    
    const modalStyle = {
        
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            zIndex: 10,
        },
        content: {
            display: "block",
            justifyContent: "center",
            background: "#222223",
            overflow: "hidden",
            top: "0",
            left: "0",
            right: "80%",
            bottom: "0",
            border:"0",
            borderRadius: "0px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 10,
            
        },
    };
    const company = {
        name:'BEBE',
        total_asset:'4000000000',
        income:'400000',
        divided_ratio:'0.005',
        divided:'10',
        next_ratio:'10',
    };;


    const PdModalOpen =()=>{
        document.body.style.overflow = 'hidden';
        setPdModalIsOpen(true)
        }
    const PdModalClose =()=>{
        document.body.style.overflow = 'unset';
        setPdModalIsOpen(false)
        }
        const {chainId, account, active, activate, deactivate} = useWeb3React();

        // Tutorial(account,tutorialCnt-1)
        // useEffect(()=>{
        //     Tutorial(account,tutorialCnt)
        // },[account,tutorialCnt])


    return(
    <div className="navigator">
    <div className="public_disclosure">
        <div className="public_disclosure_wrapper">
            <h4 onClick={()=>PdModalOpen()}>Public Disclosure</h4>
        </div>
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>PdModalClose()}
        isOpen={pdModalIsOpen}
        style={modalStyle}
        >   
            <div className="myaccount">
                <h1>Public Disclosure</h1>
                <div className='close' onClick={()=>PdModalClose()}>
                    <img src={require('../assets/images/close.png')}></img>
                </div>
                <SelectBox
                    set={OPTIONS} 
                    value={setStName}
                ></SelectBox>
                <div className="myaccount_section">
                    <h3>Name</h3>
                    <h5>{companyPD.name}</h5>
                </div>
                <div className="myaccount_section">
                    <h3>Total Assets</h3>
                    <h5>{Number(coorpName).toFixed(4)} ETH</h5>

                </div>
                <div className="myaccount_section">
                    <h3>Income</h3>
                    <h5>{(Number(companyPD.income).toFixed(4))} ETH</h5>
                </div>
                <div className="myaccount_section">
                    <h3>Current Dividend</h3>
                    <h5>{(Number(companyPD.dividend).toFixed(4))} ETH</h5> </div>
                <div className="myaccount_section">
                    <h3>Current Dividend Ratio</h3>
                    <h5>{companyPD.dividend_ratio} %</h5> 
                </div>
                <div className="myaccount_section">
                    <h3>Next Dividend Ratio</h3>
                    <h5>{companyPD.dividend_ratio*100+'%'} * ( 1 + {Number(companyPD.voted_ratio)}) = {(companyPD.dividend_ratio*100 * (1+Number(companyPD.voted_ratio))).toFixed(2)} %</h5>
                </div>
            </div>
            </Modal>
            </div>
            {!isCircuitBreaker?
                <div className="until_the_next_dividend_release">
                <h4>Until the Next Dividend Release {date}</h4>
                </div>
                : <div className="is_circuit_breaker">
                <h4>Circuit Breaker {'00:'+circuitBreakerTimer}</h4>
                </div>     
                }  

            <div className="navigation_right">
            <Link to='/' onClick={()=>setTutorialsClicked(!tutorialsClicked)}><h4 >Tutorial</h4></Link>
                {tutorialsClicked?<Tutorials account={account} tutorialCnt={0}/>:<></>}
                <Link to='/transaction'><h4>Transactions</h4></Link>
            </div>

        </div>
    )
}
export default Navigator