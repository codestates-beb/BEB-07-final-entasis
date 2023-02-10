const express = require('express');
require('dotenv').config();

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// 트래픽 제어
const limit = require('express-rate-limit');

const userRouter = require('./routes/userRouter');
const companyRouter = require('./routes/companyRouter');
const entaRouter = require('./routes/entaRouter');
const bebRouter = require('./routes/bebRouter');
const leoRouter = require('./routes/leoRouter');
const chartRouter = require('./routes/chartRouter');

const logger = require('./logger');
const { sequelize, price_his, dividend_his, position_his, enta_his, beb_his, leo_his } = require('./models');
const { 
  getENTASimpleTotalSupply,
  showAllENTATokenHolders,
  getENTATokenBalance,
  getENTATotalSupply,
  restrictENTAToken,
  allowENTAToken,
  isRestrictedENTA
} = require('./chainUtils/ENTAUtils');
const { 
  getBEBSimpleTotalSupply,
  showAllBEBTokenHolders,
  getBEBTokenBalance,
  getBEBTotalSupply,
  restrictBEBToken,
  allowBEBToken,
  isRestrictedBEB
} = require('./chainUtils/BEBUtils');
const { 
  getLEOSimpleTotalSupply,
  showAllLEOTokenHolders,
  getLEOTokenBalance,
  getLEOTotalSupply,
  restrictLEOToken,
  allowLEOToken,
  isRestrictedLEO
} = require('./chainUtils/LEOUtils');
const {sendEtherToUser, sendWeiToUser, getEtherBalance, sendDividendToUser} = require('./chainUtils/etherUtils');
const { web3Http } = require('./chainUtils');
const app = express();
app.set('port', process.env.PORT || 5050);
app.set('view engine', 'ejs');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(
  cors({
    origin: [
      'http://localhost:3000', // cross-site인 모든 주소 기입
      'http://entasis.s3-website.ap-northeast-2.amazonaws.com/'
    ],
    credentials: true,
  }),
);

// 리미트분리
app.use(limit({
  windowMs: 60 * 1000,
  max: 2000,
  delayMs: 100,
  handler(req,res) {
      res.status(this.statusCode).json({
          code: this.statusCode,
          message: "Only 100 requests per minute."
      });
  }
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: true,
//     },
//   }),
// );

//=======================================가격  변동 로직==========================================//

//STV
let stv=0;
const setStv =()=>{stv = Math.random()*(0.01-(-0.01001))-0.01};
let circuitBreaker = false;
let toggle = true;


//ENTA
let incomeRatioENTA=0;
let dividend_ratio_ENTA = 0.03;
let voted_ratio_ENTA
let chartHisENTA = [[40.7444],[1]];
let chartDataENTA
const setIncomeRatioENTA =()=>{incomeRatioENTA = Math.random()*(0.001-(-0.001001))-0.001};
const setVotedRatioENTA =()=> {voted_ratio_ENTA = (Math.random()*(0.05-(-0.05))-0.05).toFixed(3)};
let chart_his_ENTA =(e)=>{ chartHisENTA[0].push(e[0]);chartHisENTA[1].push(e[1])}

let totalVolFromENTA = 0;
let totalVolToENTA = 0;


//BEB

let incomeRatioBEB=0;
let dividend_ratio_BEB = 0.03;
let voted_ratio_BEB
let chartHisBEB = [[1.1549],[1]];
let chartDataBEB
const setIncomeRatioBEB =()=>{incomeRatioBEB = Math.random()*(0.001-(-0.001001))-0.001};
const setVotedRatioBEB =()=> {voted_ratio_BEB = (Math.random()*(0.05-(-0.05))-0.05).toFixed(3)};
let chart_his_BEB =(e)=>{ chartHisBEB[0].push(e[0]);chartHisBEB[1].push(e[1])}

let totalVolFromBEB = 0;
let totalVolToBEB = 0;


//LEO

let incomeRatioLEO=0;
let dividend_ratio_LEO = 0.03;
let voted_ratio_LEO
let chartHisLEO = [[40.1213],[1]];
let chartDataLEO
const setIncomeRatioLEO =()=>{incomeRatioLEO = Math.random()*(0.001-(-0.001001))-0.001};
const setVotedRatioLEO =()=> {voted_ratio_LEO = (Math.random()*(0.05-(-0.05))-0.05).toFixed(3)};
let chart_his_LEO =(e)=>{ chartHisLEO[0].push(e[0]);chartHisLEO[1].push(e[1])}

let totalVolFromLEO = 0;
let totalVolToLEO = 0;




// 1초
setInterval(async() => {
  if(circuitBreaker) {
    if(toggle){
      toggle = false;
      console.log("거래 제한으로 인한 price 변동 없음")
      setTimeout(async()=>{
        const enta_status = await isRestrictedENTA();
        const beb_status = await isRestrictedBEB();
        const leo_status = await isRestrictedLEO();
        if(enta_status && beb_status && leo_status) {
          const enta_result = await allowENTAToken(); // 토큰 제한 해제 컨트랙트 메소드
          const beb_result = await allowBEBToken();
          const leo_result = await allowLEOToken();
          if(enta_result && beb_result && leo_result) {
            circuitBreaker = false;
            console.log("토큰 제한 해제 완료");
          }
          else console.log("토큰 제한 해제 실패")
        }  
        toggle = true; 
      }, 60000)
    }
  }
  else {

  //ENTA
    chartHisENTA[1].forEach(element => {totalVolToENTA+=element});  
    setStv()
    chartDataENTA = {
      createdAt: new Date(),
      open: chartHisENTA[0][0].toFixed(4),
      close:chartHisENTA[0][chartHisENTA[0].length-1].toFixed(4),
      high:chartHisENTA[0].reduce((acc,cur)=>{
        if(acc<cur) return cur 
        else if(acc>=cur) return acc
      }).toFixed(4),
      low:chartHisENTA[0].reduce((acc,cur)=>{
        if(acc>cur) return cur 
        else if(acc<=cur) return acc
      }).toFixed(4),
      totalVolTo:totalVolToENTA.toFixed(4),
      totalVolFrom:totalVolFromENTA.toFixed(4),
      totalCurrentPrices:{
  enta : chartHisENTA[0][chartHisENTA[0].length-1].toFixed(4),
  beb : chartHisBEB[0][chartHisBEB[0].length-1].toFixed(4),
  leo : chartHisLEO[0][chartHisLEO[0].length-1].toFixed(4),
}
    }
    console.log(chartDataENTA);

    let volumeENTA = (1 + stv*10000)*(1+incomeRatioENTA*10000)>0?(1 + stv*10000)*(1+incomeRatioENTA*10000):0.01
    let priceENTA = chartHisENTA[0][chartHisENTA[0].length-1]>0.5?chartHisENTA[0][chartHisENTA[0].length-1]:0.5;
    chart_his_ENTA([priceENTA * (1 + stv)*(1+incomeRatioENTA) * (1+(1 + stv*1000)*(1+incomeRatioENTA*1000)/1000000), volumeENTA])

    //BEB
    chartHisBEB[1].forEach(element => {totalVolToBEB+=element});  
    setStv()
    chartDataBEB = {
      createdAt: new Date(),
      open: chartHisBEB[0][0].toFixed(4),
      close:chartHisBEB[0][chartHisBEB[0].length-1].toFixed(4),
      high:chartHisBEB[0].reduce((acc,cur)=>{
        if(acc<cur) return cur 
        else if(acc>=cur) return acc
      }).toFixed(4),
      low:chartHisBEB[0].reduce((acc,cur)=>{
        if(acc>cur) return cur 
        else if(acc<=cur) return acc
      }).toFixed(4),
      totalVolTo:totalVolToBEB.toFixed(4),
      totalVolFrom:totalVolFromBEB.toFixed(4),
      totalCurrentPrices:{
  enta : chartHisENTA[0][chartHisENTA[0].length-1].toFixed(4),
  beb : chartHisBEB[0][chartHisBEB[0].length-1].toFixed(4),
  leo : chartHisLEO[0][chartHisLEO[0].length-1].toFixed(4),
}
    }
    console.log(chartDataBEB);

    let volumeBEB = (1 + stv*10000)*(1+incomeRatioBEB*10000)>0?(1 + stv*10000)*(1+incomeRatioBEB*10000):0.01
    let priceBEB = chartHisBEB[0][chartHisBEB[0].length-1]>0.5?chartHisBEB[0][chartHisBEB[0].length-1]:0.5;
    chart_his_BEB([priceBEB * (1 + stv)*(1+incomeRatioBEB) * (1+(1 + stv*1000)*(1+incomeRatioBEB*1000)/1000000), volumeBEB])

    //LEO
    chartHisLEO[1].forEach(element => {totalVolToLEO+=element});  
    setStv()
    chartDataLEO = {
      createdAt: new Date(),
      open: chartHisLEO[0][0].toFixed(4),
      close:chartHisLEO[0][chartHisLEO[0].length-1].toFixed(4),
      high:chartHisLEO[0].reduce((acc,cur)=>{
        if(acc<cur) return cur 
        else if(acc>=cur) return acc
      }).toFixed(4),
      low:chartHisLEO[0].reduce((acc,cur)=>{
        if(acc>cur) return cur 
        else if(acc<=cur) return acc
      }).toFixed(4),
      totalVolTo:totalVolToLEO.toFixed(4),
      totalVolFrom:totalVolFromLEO.toFixed(4),
      totalCurrentPrices:{
  enta : chartHisENTA[0][chartHisENTA[0].length-1].toFixed(4),
  beb : chartHisBEB[0][chartHisBEB[0].length-1].toFixed(4),
  leo : chartHisLEO[0][chartHisLEO[0].length-1].toFixed(4),
}
    }
    console.log(chartDataLEO);

    let volumeLEO = (1 + stv*10000)*(1+incomeRatioLEO*10000)>0?(1 + stv*10000)*(1+incomeRatioLEO*10000):0.01
    let priceLEO = chartHisLEO[0][chartHisLEO[0].length-1]>0.5?chartHisLEO[0][chartHisLEO[0].length-1]:0.5;
    chart_his_LEO([priceLEO * (1 + stv)*(1+incomeRatioLEO) * (1+(1 + stv*1000)*(1+incomeRatioLEO*1000)/1000000), volumeLEO])
  }
}, 1000 );

//======================================================================================================//

// 1분
setInterval(async () => {

  console.log(`${new Date()}`.slice(22,-38))
  if(`${new Date()}`.slice(22,-38)==='00'){


    //ENTA
    enta_his.create(chartDataENTA)
    totalVolFromENTA = totalVolToENTA
    totalVolToENTA=0
    chartHisENTA[0].splice(0,chartHisENTA[0].length-1);
    chartHisENTA[1].splice(0,chartHisENTA[1].length-1);

    
    //BEB
    beb_his.create(chartDataBEB)
    totalVolFromBEB = totalVolToBEB
    totalVolToBEB=0
    chartHisBEB[0].splice(0,chartHisBEB[0].length-1);
    chartHisBEB[1].splice(0,chartHisBEB[1].length-1);

    
    //LEO
    leo_his.create(chartDataLEO)
    totalVolFromLEO = totalVolToLEO
    totalVolToLEO=0
    chartHisLEO[0].splice(0,chartHisLEO[0].length-1);
    chartHisLEO[1].splice(0,chartHisLEO[1].length-1);

  }
}, 1000);

//=====================================================================================================//

// 5분
// 3개 토큰 모두 배당금이 지급될 수 있도록 해야함
setInterval(async () => {

  //ENTA
  setIncomeRatioENTA();
  setVotedRatioENTA();
  let incomeRatioSetENTA = incomeRatioENTA>0 ? incomeRatioENTA : 0.0001
  let incomeENTA = (incomeRatioSetENTA * chartHisENTA[0][chartHisENTA[0].length-1] * await getENTASimpleTotalSupply()).toFixed(10)
  // console.log(incomeENTA);
  let dividendENTA = dividend_ratio_ENTA * incomeENTA;
  await dividend_his.create({ // 수정 필요
    token_name: "ENTAToken",
    income: incomeENTA,
    voted_ratio: voted_ratio_ENTA, // 선출된 배당률
    dividend_ratio: dividend_ratio_ENTA, // 계산된 배당률
    dividend: dividendENTA, // 총 배당금
  })

  //BEB
  setIncomeRatioBEB();
  setVotedRatioBEB();
  let incomeRatioSetBEB = incomeRatioBEB>0 ? incomeRatioBEB : 0.0001
  let incomeBEB = (incomeRatioSetBEB * chartHisBEB[0][chartHisBEB[0].length-1] * await getBEBSimpleTotalSupply()).toFixed(10)
  // console.log(income);
  let dividendBEB = dividend_ratio_BEB * incomeBEB;
  await dividend_his.create({ // 수정 필요
    token_name: "BEBToken",
    income: incomeBEB,
    voted_ratio: voted_ratio_BEB, // 선출된 배당률
    dividend_ratio: dividend_ratio_BEB, // 계산된 배당률
    dividend: dividendBEB, // 총 배당금
  })
  
  //LEO
  setIncomeRatioLEO();
  setVotedRatioLEO();
  let incomeRatioSetLEO = incomeRatioLEO>0 ? incomeRatioLEO : 0.0001
  let incomeLEO = (incomeRatioSetLEO * chartHisLEO[0][chartHisLEO[0].length-1] * await getLEOSimpleTotalSupply()).toFixed(10)
  // console.log(income);
  let dividendLEO = dividend_ratio_LEO * incomeLEO;
  await dividend_his.create({ // 수정 필요
    token_name: "LEOToken",
    income: incomeLEO,
    voted_ratio: voted_ratio_LEO, // 선출된 배당률
    dividend_ratio: dividend_ratio_LEO, // 계산된 배당률
    dividend: dividendLEO, // 총 배당금
  })
  
  //ENTA
  let entaTokenholders = await showAllENTATokenHolders();
  let entaTotalSupply = await getENTATotalSupply();

  for(let i=0; i<entaTokenholders.length; i++) {
    if(entaTokenholders[i] !== process.env.ADMIN_ADDRESS) { // 거래소 제외
      const balance = await getENTATokenBalance(entaTokenholders[i]);
      const stake = balance / entaTotalSupply;
      const personalDividend = String((dividendENTA * stake).toFixed(18))
      const dividendTx = await sendDividendToUser(entaTokenholders[i], personalDividend);
      // const result = await getEtherBalance(entaTokenholders[i]);

      const fixedBalance = web3Http.utils.fromWei(balance, 'ether');
      console.log(fixedBalance);

      await position_his.create({
        user_wallet: entaTokenholders[i],
        order: "dividend",
        price: personalDividend,
        amount: fixedBalance,
        token_name: "ENTAToken",
        txout: dividendTx.transactionHash
      })
    }
  }
  // 차기 배당률
  dividend_ratio_ENTA = (dividend_ratio_ENTA * (1 + Number(voted_ratio_ENTA))).toFixed(4)


  //BEB
  let bebTokenholders = await showAllBEBTokenHolders();
  let bebTotalSupply = await getBEBTotalSupply();

  for(let i=0; i<bebTokenholders.length; i++) {
    if(bebTokenholders[i] !== process.env.ADMIN_ADDRESS) { // 거래소 제외
      const balance = await getBEBTokenBalance(bebTokenholders[i]);
      const stake = balance / bebTotalSupply;
      const personalDividend = String((dividendBEB * stake).toFixed(18))
      const dividendTx = await sendDividendToUser(bebTokenholders[i], personalDividend);
      // const result = await getEtherBalance(bebTokenholders[i]);

      const fixedBalance = web3Http.utils.fromWei(balance, 'ether');
      console.log(fixedBalance);

      await position_his.create({
        user_wallet: bebTokenholders[i],
        order: "dividend",
        price: personalDividend,
        amount: fixedBalance,
        token_name: "BEBToken",
        txout: dividendTx.transactionHash
      })
    }
  }
  // 차기 배당률
  dividend_ratio_BEB = (dividend_ratio_BEB * (1 + Number(voted_ratio_BEB))).toFixed(4) 

  //LEO
  let leoTokenholders = await showAllLEOTokenHolders();
  let leoTotalSupply = await getLEOTotalSupply();

  for(let i=0; i<leoTokenholders.length; i++) {
    if(leoTokenholders[i] !== process.env.ADMIN_ADDRESS) { // 거래소 제외
      const balance = await getENTATokenBalance(leoTokenholders[i]);
      const stake = balance / leoTotalSupply;
      const personalDividend = String((dividendLEO * stake).toFixed(18))
      const dividendTx = await sendDividendToUser(leoTokenholders[i], personalDividend);
      // const result = await getEtherBalance(leoTokenholders[i]);

      const fixedBalance = web3Http.utils.fromWei(balance, 'ether');
      console.log(fixedBalance);

      await position_his.create({
        user_wallet: leoTokenholders[i],
        order: "dividend",
        price: personalDividend,
        amount: fixedBalance,
        token_name: "LEOToken",
        txout: dividendTx.transactionHash
      })
    }
  }
  // 차기 배당률
  dividend_ratio_LEO = (dividend_ratio_LEO * (1 + Number(voted_ratio_LEO))).toFixed(4) 
}, 600000);


//=========================================================================================================//

// 3개 토큰에 대한 rtd 1초마다 모두 보낼 수 있어야 함.
//ENTA
app.get('/rtd/enta', async (req, res, next) => {
  try {
    if(!chartDataENTA) return res.status(400).json({message: "No such data"});
    return res.status(200).json(chartDataENTA);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});
//BEB
app.get('/rtd/beb', async (req, res, next) => {
  try {
    if(!chartDataBEB) return res.status(400).json({message: "No such data"});
    return res.status(200).json(chartDataBEB);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});
//LEO
app.get('/rtd/leo', async (req, res, next) => {
  try {
    if(!chartDataLEO) return res.status(400).json({message: "No such data"});
    return res.status(200).json(chartDataLEO);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});
// 3개 토큰 모두 거래제한 걸 수 있도록 해야함
app.post('/restrict', async (req, res, next) => {
  try {
    circuitBreaker = true;
    const enta_status = await isRestrictedENTA();
    const beb_status = await isRestrictedBEB();
    const leo_status = await isRestrictedLEO();
    if(enta_status && beb_status && leo_status) {
      console.log("이미 제한되어 있는 토큰")
      return res.status(400).send({message: "this token had already been restricted"})
    }
    const enta_result = await restrictENTAToken();
    const beb_result = await restrictBEBToken();
    const leo_result = await restrictLEOToken();
    if(enta_result && beb_result && leo_result) {
      console.log("토큰 거래 제한 성공");
      return res.status(200).send({status: "successfully restricted the token"});
    }
    return res.status(400).send({status: "failed with the contract"});
  } catch (err) {
    console.error(err);
    return next(err);
  }
})

app.use('/chart', chartRouter);
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/enta', entaRouter);
app.use('/beb', bebRouter);
app.use('/leo', leoRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} There is no Router`);
  err.status = 404;
  next(err);
});

// 에러로깅
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

// 서버 리스너
app.listen(app.get('port'), () => {
  logger.info(app.get('port'), 'is up and listening');
});

module.exports = app;
