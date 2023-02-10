import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { injected } from "../connectors";
import History from "./History"
const HistoryWrapper =({userPosition,walletConnected,setWalletConnected,setOffset,setLimit,setTxs,refresh
})=>{
    const [currentPageNum, setCurrentPageNum]=useState(1)
    const {chainId, account, active, activate, deactivate} = useWeb3React();

    const handleConnect = () => {
        if(active) {
            deactivate();
            return;
        }
        activate(injected, (error) => {
            if('/No ethereum provider was found on window.ethereum/'.test(error)) {
                window.open('https://metamask.io/download.html');
            }
        });
        setWalletConnected(!walletConnected)
    }
    let positions = userPosition!==undefined&& userPosition!==null?userPosition:[]
    let pageSet = 10;
    let pages = Math.ceil(positions.totalLength/ 10);
    let offset = pageSet * (currentPageNum - 1);
    let limit = offset + pageSet;
    useEffect(()=>{
        setOffset(pageSet * (currentPageNum - 1))
        setLimit(pageSet * (currentPageNum - 1)+pageSet-1)
    },[offset,userPosition,refresh])
    return(
        <div className="history_wrapperA" >

            <div className="history_wrapperA_top">
                <h4>History</h4>
                <div className="pagination">
                    <div 
                    onClick={()=>currentPageNum>1?setCurrentPageNum(currentPageNum-1):<></>}
                    className="pagination_btn">
                        {<i className="fas fa-caret-left"></i>}
                    </div>
                    {isNaN(pages)?<></>:pages<=10?
                    <div className="pagination_numbers">
                    
                    {Array(pages).fill().map((_,i)=>{
                        return <div 
                    onClick={()=>setCurrentPageNum(i+1)}
                    className="pagination_numbers btn">
                    <div className="pagination_numbers_btn">{i+1}</div>
                    </div>})}
                    
                    </div>:
                        <div className="pagination_numbers">
                            <div 
                            onClick={()=>setCurrentPageNum(1)}
                            className="pagination_numbers btn">1</div>
                            <div 
                            onClick={()=>setCurrentPageNum(2)}
                            className="pagination_numbers btn">2</div>
                            <div 
                            onClick={()=>setCurrentPageNum(3)}
                            className="pagination_numbers btn">3</div>
                            <div 
                            className="pagination_numbers btn">···</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0))-1)}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))-1}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0)))}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0))+1)}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))+1}</div>
                            <div 
                            className="pagination_numbers btn">···</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages-2)}
                            className="pagination_numbers btn">{pages-2}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages-1)}
                            className="pagination_numbers btn">{pages-1}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages)}
                            className="pagination_numbers btn">{pages}</div>
                        </div>
                    }
                    <div 
                    onClick={()=>currentPageNum<pages?setCurrentPageNum(currentPageNum+1):<></>}
                    className="pagination_btn">
                        {<i className="fas fa-caret-right"></i>}
                    </div>
                </div>
                <div 
                    className="btn_m">{pages>0?currentPageNum:0}
                </div>
            </div>
            
            <div className="history_wrapperA_menu">
                <h5>Order</h5>
                <h5>Price</h5>
                <h5>Amount</h5>
                <h5>Fee</h5>
                <h5>Date</h5>
                <h5>From</h5>
    
            </div>
            <div className="main_history_wrapperA_container">
                {positions!==undefined&&pages>0?(account!==undefined?[...positions.userPosition].map((e)=>{
                    return (<History
                        setTxs={setTxs}
                        key={e.id}
                        order = {e.order}
                        price = {e.price}
                        amount = {e.amount}
                        fee = {e.fee}
                        date = {`${e.createdAt}`.slice(0,10)+' '+`${e.createdAt}`.slice(14,19)}
                        token_name={e.token_name}
                        tx_in={e.txin}
                        tx_out={e.txout}
                    />)
                }):<></>):<div className="disconnection_status">
                <h6>Start Trading</h6>
                <h6 className='disconnection_status_login' onClick={handleConnect}>Log In or Sign Up </h6>
                </div>}
                {}
            </div>
        </div>
    )
}
export default HistoryWrapper