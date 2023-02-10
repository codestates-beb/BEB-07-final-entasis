require('dotenv').config();
const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser, getEtherBalance } = require('../chainUtils/etherUtils');
const { getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/ENTAUtils');

module.exports = {
  enroll: async (req, res, next) => {
    const { wallet } = req.query;
    const userInfo = await users.findOne({
      where: { wallet },
    });
    try {
      if(userInfo === null) {
        await users.create({
          wallet,
        })
        const result = {
          status: "success",
          name: "Unnamed",
          visited: false,
          cnt: 0
        }
        return res.status(200).json(result);
      }
      const result = {
        status: "success",
        name: userInfo.name,
        visited: true,
        cnt: userInfo.cnt
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  chname: async (req, res, next) => {
    const { wallet } = req.query;
    const { name } = req.body;
    const check = await users.findOne({where: {wallet}})
    try {
      if(!name || !check) return res.status(400).send({message: "Not enrolled user or please input name"})
      await users.update({ name }, { where: { wallet } });
      const result = {
        status: "success",
        name
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  tutorial: async (req, res, next) => {
    const { wallet, cnt } = req.query;
    const check = await users.findOne({where: {wallet}})
    try {
      if(!cnt || !check) return res.status(400).send({message: "Not enrolled user or please input cnt"})
      await users.update({ cnt }, { where: { wallet } });
      const result = {
        status: "success",
        cnt
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  // 무한 스크롤 기능 구현시 offset, limit을 이용한 수정 필요
  position: async (req, res, next) => {
    const { wallet,offset,limit } = req.query;
    try {
      if(!wallet) return res.status(400).json({message:'not enough query'});
      const userPosition = await position_his.findAll({
        where: { user_wallet: wallet },
        offset: Number(offset),
        limit: Number(limit),
        order: [['id', 'DESC']],
      })
      const total = await position_his.findAll({ where: { user_wallet: wallet } });
      if(!total) return res.status(400).json({message:"No such data"});
      return res.status(200).json({userPosition:userPosition,totalLength: total.length});
      
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  mypage: async (req, res, next) => {
    const { wallet } = req.query;
    try {
      const userInfo = await users.findOne({
        where: { wallet }
      })
      if(!userInfo) return res.status(400).json({message: "No such user"});
      // const balance = await getTokenBalance(wallet);
      const result = {
        name : userInfo.name,
        faucet: userInfo.faucet,
        cnt: userInfo.cnt,
      }
      return res.status(200).json(result)
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  faucet: async (req, res, next) => {
    const { wallet } = req.query;
    const userInfo = await users.findOne({
      where: { wallet }
    })
    try {
      if(!userInfo) return res.status(400).send({message: "No such user"});
      if(userInfo.faucet) return res.status(400).send({message: "user has already used the faucet"});
      await depositFaucet(wallet); // 컨트랙트
      await users.update({faucet: 1}, {where: {wallet}});
      return res.status(200).json({status: "success"})
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  ethbalance: async (req, res, next) => {
    const { wallet } = req.query;
    try {
      const balance = await getEtherBalance(wallet);
      return res.status(200).send({balance})
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  personalDividend: async (req, res, next) => {
    const { wallet } = req.query;
    try {
      const entaDividend = await position_his.sum('price', { where: { user_wallet: wallet, order: 'dividend', token_name: 'ENTAToken' } });
      const bebDividend = await position_his.sum('price', { where: { user_wallet: wallet, order: 'dividend', token_name: 'BEBToken' } });
      const leoDividend = await position_his.sum('price', { where: { user_wallet: wallet, order: 'dividend', token_name: 'LEOToken' } });
      if(!entaDividend || !bebDividend || !leoDividend) return res.status(400).send({message: "wrong with sum query"})
      const result = {
        ENTAToken: entaDividend,
        BEBToken: bebDividend,
        LEOToken: leoDividend
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}