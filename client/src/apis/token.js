import axios from 'axios';
import { useState } from 'react';

// Test API Request
export const BuyToken = async(token,price,amount,wallet,txin) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultBuyToken= await axios.post("http://localhost:5050/"+token+"/buy", {"price":price,"amount":amount,"wallet":wallet, "txin":txin})
    .then(res=>res)
    .then(err=>err)
    return resultBuyToken
}

export const SellToken = async(token,price,amount,wallet,txin) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultSellToken = await axios.post("http://localhost:5050/"+token+"/sell", {"price":price,"amount":amount,"wallet":wallet, "txin":txin})
    .then(res=>res)
    .then(err=>err)
    return resultSellToken
}
