const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { getTotalSupply, getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/ENTAUtils');
const { ENTA_Contract, BEB_Contract, LEO_Contract, web3Http } = require('../chainUtils/index');

module.exports = {
    vote: async (req,res,next) => {
        const { name, ratio, user_wallet } = req.body;
        const company = await companys.findOne({where: { name }});
        let balance;
        try{
            if(!company) return res.status(400).send({message: "no such company"})
            if(name == 'ENTAToken') balance = await ENTA_Contract.methods.balanceOf(user_wallet).call();
            else if (name == 'BEBToken') balance = await BEB_Contract.methods.balanceOf(user_wallet).call();
            else if (name == 'LEOToken') balance = await LEO_Contract.methods.balanceOf(user_wallet).call();

            // 정상적으로 자료형에 맞게 들어가는지 확인하기
            const simpleBalance = web3Http.utils.fromWei(balance, 'ether');

            await position_his.create({
                user_wallet,
                order: "vote",
                price: ratio,
                token_name: name,
                amount: simpleBalance
            })

            return res.status(200).send({"status": "success"})
        } catch(err) {
            console.err(err);
            return next(err);
        }
    },
    
    pdisclosure: async(req,res,next) => {
        const { name } = req.query;
        try{
            const company = await companys.findOne({where: { name }});
            if(!name || !company) return res.status(400).send({message: "invalid token name"})

            const companyinfo = await dividend_his.findOne({
                where: { token_name: name },
                order: [['id', 'DESC']]
            })
            if(!companyinfo) return res.status(400).send({message: "No dividend data with such token name "});

            const result = {
                name,
                // total_asset에 관한 부분은 클라이언트에서
                income: companyinfo.income,
                dividend_ratio: companyinfo.dividend_ratio,
                dividend: companyinfo.dividend,
                voted_ratio: companyinfo.voted_ratio
            }
            return res.status(200).send(result);
        } catch (err){
            console.error(err);
            return next(err);
        }
    },
}