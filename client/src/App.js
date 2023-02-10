import {React, useState}  from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Tutorials from './components/Tutorials';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionsPage';
function App() {
  const [isWelcome,setIsWelcome]=useState(false)
  const [txs, setTxs] = useState({
    transaction_in:"",
    transaction_out:""
})
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage
                setTxs={setTxs}
                isWelcome={isWelcome}
                setIsWelcome={setIsWelcome}

                // ST_CurrentPrice={currentPrice.close} 
                // powerOfMarket={powerOfMarket}
                // userEth={userEth}
                // // userEntaToken={userEntaToken}
                // // userBebToken={userBebToken}
                // // userLeoToken={userLeoToken}
                // setOffset={setOffset}
                // setLimit={setLimit}
                // walletConnected = {walletConnected}
                // setWalletConnected = {setWalletConnected}
                // userPosition={userPosition}
        />}/>
        <Route path='/transaction' element={<TransactionPage
                txs={txs}
                // ST_CurrentPrice={currentPrice.close} 
                // powerOfMarket={powerOfMarket}
                // userEth={userEth}
                // // userEntaToken={userEntaToken}
                // // userBebToken={userBebToken}
                // // userLeoToken={userLeoToken}
                // setOffset={setOffset}
                // setLimit={setLimit}
                // walletConnected = {walletConnected}
                // setWalletConnected = {setWalletConnected}
                // userPosition={userPosition}
        />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
