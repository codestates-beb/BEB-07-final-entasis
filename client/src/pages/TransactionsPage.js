import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Header from '../components/Header';
import Navigator from '../components/Navigator';
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"
import Assets from '../components/Assets';
import Historys from '../components/Historys'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const TransactionPage =({txs,

    // isEnroll,
    // walletConnected ,
    // setWalletConnected ,
    // isLoading ,
    // totalCurrentPrices,
    // stName,
    // setStName,
    // companyPD,
    // isCircuitBreaker,
    // setIsCircuitBreaker,
    // OPTIONS,

})=>{
    document.body.style.overflow = 'unset';
    for(let i = window.innerHeight ; i>1 ;i--){
        window.scrollTo(i,i)
    }
    console.log(window.innerHeight)
    const modalStyle = {
        overlay: {
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            zIndex: 10,
        },
        content: {
            display: "block",
            justifyContent: "center",
            background: "#2B2B2B",
            overflow: "hidden",
            border:"0",
            borderRadius: "10px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 20,
            
        },
    };

    const web3 = new Web3(
        window.ethereum || "http://18.182.9.156:8545"
    );
    const contractAccount = '0x04794606b3065df94ef3398aA2911e56abE169B6';
    const StABI = TokenABI.abi
    const tokenContract = new web3.eth.Contract(StABI, contractAccount);
    const [transactionIn, setTransactionIn] = useState(txs.transaction_in.tx_in)
    const [transactionOut, setTransactionOut] = useState(txs.transaction_out.tx_out)
    const [txInObj, setTxInObj] = useState([]);
    const [txOutObj, setTxOutObj] = useState([]);
    const BN = web3.utils.BN;

    async function getTxIn(tx) {
        const txdata =  await web3.eth.getTransaction(tx)
        setTxInObj(txdata)
    }
    async function getTxOut(tx) {
        const txdata =  await web3.eth.getTransaction(tx)
        setTxOutObj(txdata)
    }
    async function TxInAddress(e) {
        setTransactionIn(e.target.value)
        console.log(transactionIn)
    }
    async function TxOutAddress(e) {
        setTransactionOut(e.target.value)
        console.log(transactionOut)
    }

    useEffect(() =>{
        getTxIn(transactionIn);
    },[transactionIn])
    useEffect(() =>{
        getTxOut(transactionOut);
    },[transactionOut])
return(
    <div className='transaction'>
            <div className="header">
        
        <Link to='/'>
            <img src={require('../assets/images/logo.png')}></img>
        </Link>
        <Link to='/'>
            <img className='entasis_main_logo' src={require('../assets/images/ENTASIS.png')}></img>
        </Link>
    </div>
    <div className="navigator">
    <div className="public_disclosure">
        <div className="public_disclosure_wrapper">
        </div>
        </div>
            <div className="navigation_right">
                <Link to='/transaction'><h4>Transactions</h4></Link>
            </div>

        </div>

        <div className='transactions'>

            <div className="show_transaction_in">
                {/* <button type="button" className="button_transaction" onClick={console.log(txObj)}>
                    <h5>Get Transaction info</h5>
                </button> */}
                <div className='show_transaction_in_top'>
                    <h1>Transaction In</h1>
                    <div className='input_transaction_wrapper'>
                        <input type="text" className="input_transaction" onChange={e => TxInAddress(e)} placeholder={transactionIn!==undefined ?transactionIn:'Search Transaction Hash'}></input>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className='info'>
                    {(txInObj === null) ? 
                    <div>
                        <h3>Transaction Hash : </h3>
                        <h3>Block Hash : </h3>
                        <h3>Block Number : </h3>
                        <h3>From : </h3>
                        <h3>To : </h3>
                        <h3>Gas : </h3>
                        <h3>Gas Price : </h3>
                        <h3>Input : </h3>
                        <h3>Nonce : </h3>
                        <h3>Transaction Index : </h3>
                        <h3>value :</h3>
                    </div>
                    : <div>
                        <h3>Transaction Hash : {transactionIn}</h3>
                        <h3>Block Hash : {txInObj.blockHash}</h3>
                        <h3>Block Number : {txInObj.blockNumber}</h3>
                        <h3>From : {txInObj.from}</h3>
                        <h3>To : {txInObj.to}</h3>
                        <h3>Gas : {txInObj.gas}</h3>
                        <h3>Gas Price : {txInObj.gasPrice}</h3>
                        <h3>Input : {txInObj.input}</h3>
                        <h3>Nonce : {txInObj.nonce}</h3>
                        <h3>Transaction Index : {txInObj.transactionIndex}</h3>
                        <h3>value : {web3.utils.fromWei(BN(txInObj.value).toString(), 'ether')}</h3>
                    </div>}<br/>

                </div>
            </div>


            <div className="show_transaction_out">
                <div className='show_transaction_out_top'>
                    <h1>Transaction Out</h1>
                    {/* <button type="button" className="button_transaction" onClick={console.log(txObj)}>
                        <h5>Get Transaction info</h5>
                    </button> */}
                    <div className='input_transaction_wrapper'>
                        <input type="text" className="input_transaction" onChange={e => TxOutAddress(e)} placeholder={transactionIn!==undefined ?transactionIn:'Search Transaction Hash'}></input>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div  className='info'>
                {(txOutObj === null) ? 
                    <div>
                        <h3>Transaction Hash : </h3>
                        <h3>Block Hash : </h3>
                        <h3>Block Number : </h3>
                        <h3>From : </h3>
                        <h3>To : </h3>
                        <h3>Gas : </h3>
                        <h3>Gas Price : </h3>
                        <h3>Input : </h3>
                        <h3>Nonce : </h3>
                        <h3>Transaction Index : </h3>
                        <h3>value :</h3>
                    </div>

                : <div>
                    <h3>Transaction Hash : {transactionOut}</h3>
                    <h3>Block Hash : {txOutObj.blockHash}</h3>
                    <h3>Block Number : {txOutObj.blockNumber}</h3>
                    <h3>From : {txOutObj.from}</h3>
                    <h3>To : {txOutObj.to}</h3>
                    <h3>Gas : {txOutObj.gas}</h3>
                    <h3>Gas Price : {txOutObj.gasPrice}</h3>
                    <h3>Input : {txOutObj.input}</h3>
                    <h3>Nonce : {txOutObj.nonce}</h3>
                    <h3>Transaction Index : {txOutObj.transactionIndex}</h3>
                    <h3>value : {web3.utils.fromWei(BN(txOutObj.value).toString(), 'ether')}</h3>
                </div>}</div>
                </div>
            {/* <Historys  
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
                    // userEntaToken={userEntaToken}
                    // userBebToken={userBebToken}
                    // userLeoToken={userLeoToken}
                /> */}


            {/* <div>Blockchain Explorer</div>
            <div>Search</div>
            <div>Security Token Price</div>
            <div>Blockchain Explorer</div>
            <div>Block  #16538530</div>
            <div>Overview</div>
            <div>Consensus Info</div>
            <div>Comments</div>
            <div>Block Height: 16538530</div>
            <div>Status: Unfinalized</div>
            <div>Timestamp: 1 min ago (Feb-02-2023 03:46:47 AM +UTC)</div>
            <div>Proposed On: Block proposed on slot 5707132, epoch 178347</div>
            <div>Transactions: 87 transactions and 26 contract internal transactions in this block</div>
            <div>Fee Recipient: 0x3bee5122e2a2fbe11287aafb0cb918e22abb5436 (MEV Builder: 0x3B...436) in 12 secs</div>
            <div>Block Reward: 0.011897638841446206 Ether (0 + 0.161741941286184726 - 0.14984430244473852)</div>
            <div>Total Difficulty: 58,750,003,716,598,352,816,469</div>
            <div>Size: 31,667 bytes</div>
            <div>Gas Used: 7,121,505 (23.74%)
            -53% Gas Target</div>
            <div>Gas Limit: 30,000,000</div>
            <div>Base Fee Per Gas: 0.000000021041100504 Ether (21.041100504 Gwei)</div>
            <div>Burnt Fees: 🔥 0.14984430244473852 Ether</div>
            <div>Extra Data: 0x (Hex:Null)</div>
            <div>Hash: 0xcdd77ff699d4bba3ba7df16d54b20f4c0a580321d302657ab1abb65d0115d23f</div>
            <div>Parent Hash: 0xf372f918981c8dd0dd67f96118d1c8a9b822d52921ff7579c97a29606d67288d</div>
            <div>StateRoot: 0x66470eb855af73703ea30139a76bed8624617ec9e2c3595876c100f077fecaab</div>
            <div>Nonce: 0x0000000000000000</div> */}
            <Footer></Footer>
        </div>
    </div>
)
}
export default TransactionPage