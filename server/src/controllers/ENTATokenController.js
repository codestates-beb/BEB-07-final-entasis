const { position_his } = require('../models');
const { sendWeiToUser, sendEtherToUser, getEtherBalance } = require('../chainUtils/etherUtils');
const { sendENTATokenToUser, restrictENTAToken, allowENTAToken, isRestrictedENTA } = require('../chainUtils/ENTAUtils');
const { ENTA_Contract } = require('../chainUtils/index')

module.exports = {
    buy: async(req,res,next)=> {
        const {price,amount,wallet, txin} = req.body;
        try {
            if(!price || !amount || !wallet || !txin) return res.status(400).json({status : "fail", message: "there's a problem with body"});
            // 클라이언트 : 메타마스크를 통해 거래소로 이더 전송(수수료도 전송해야 함)
            
            // 서버 : 컨트랙트를 통해 거래소에서 유저에게 토큰 전송(거래소이기 때문에 수수료 메소드는 따로 x)
            const buyToken = await sendENTATokenToUser(wallet, amount);
            if(buyToken) {
                await position_his.create({
                    user_wallet: wallet,
                    order: 'buy',
                    price: price,
                    amount: amount,
                    fee: price * amount * 0.0004,
                    token_name: "ENTAToken",
                    txin,
                    txout: buyToken.transactionHash
                });
                return res.status(200).json({status : "success"});
            }
            return res.status(400).json({status: "fail", message: "failed to send token through contract"})
        } catch (err) {
            console.err(err);
            return next(err);
        }
    },

    sell: async(req,res,next)=> {
        const {price,amount,wallet,txin} = req.body;
        try {
            if(!price || !amount || !wallet) return res.status(400).json({status : "fail", message: "there's a problem with body"});
            
            // 클라이언트 : 메타마스크를 통해 거래소로 토큰 전송

            // 거래 제한 여부 확인
            const isRestricted = await isRestrictedENTA();
            if(isRestricted) {
                return res.status(400).send({status: "fail", message: "거래가 제한되어 이더를 송금할 수 없습니다."});
            }

            // 서버 : web3를 통해 거래소에서 유저에게 이더 전송(수수료 제외하고 전송)
            const value = String(price * amount * 0.9996);
            const sellToken = await sendWeiToUser(wallet, value);
            if(sellToken){
                await position_his.create({
                    user_wallet: wallet,
                    order: 'sell',
                    price: price,
                    amount : amount,
                    fee: price * amount * 0.0004,
                    token_name: "ENTAToken",
                    txin,
                    txout: sellToken.transactionHash
                });
                return res.status(200).json({status : "success"});
            }
            return res.status(400).json({status: "fail", message: "failed to send ether through contract"})
        } catch (err) {
            console.err(err);
            return next(err);
        }
    },
}