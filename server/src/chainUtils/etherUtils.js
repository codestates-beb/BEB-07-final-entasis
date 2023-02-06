const { web3Http, Web3, tokenContract } = require('./index');

const { ADMIN_ADDRESS } = process.env;

const depositFaucet = async (recipient, value = '50000000000000000000') => { // faucet 얼마나 할지 설정 필요
  try { 
    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value,
    });
    return true
  } catch (err) {
    console.error(err);
    return false;
  }
};

const sendDividendToUser = async (recipient, value) =>{
  try {
    const weiValue = web3Http.utils.toWei(value, 'ether')
    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value: weiValue,
    });
    console.log("배당금 지급 완료, 수신자 : " + recipient);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const sendWeiToUser = async (recipient, value) =>{
  try {
    // 거래 제한 여부 확인
    const isRestricted = await tokenContract.methods.isRestricted().call();
    if(isRestricted) {
      console.log("거래가 제한되어 이더를 송금할 수 없습니다.")
      return false;
    }
    const weiValue = web3Http.utils.toWei(value, 'ether')
    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value: weiValue,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const sendEtherToUser = async (recipient, value) =>{
  try {
    // 거래 제한 여부 확인
    const isRestricted = await tokenContract.methods.isRestricted().call();
    if(isRestricted) {
      console.log("거래가 제한되어 이더를 송금할 수 없습니다.")
      return false;
    }

    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value: value,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// 이더 잔액 가져오는 함수
const getEtherBalance = async (address) => {
  try {
    const balance = await web3Http.eth.getBalance(address)
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = {
  depositFaucet,
  sendWeiToUser,
  sendEtherToUser,
  getEtherBalance,
  sendDividendToUser
};