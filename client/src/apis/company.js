import axios from 'axios';

// Test URL
const origin = "http://localhost:5050";
const getCompanyURL = origin + "/company/"; 

const vote = getCompanyURL + "vote/"
const pdisclosure = getCompanyURL + "pdisclosure/?cdp="

// Test API Request
export const Vote = async(st_name,ratio,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const voteJSON = {
        name:st_name,
        ratio:ratio,
        user_wallet:wallet
    }
    const resultVote=  axios.post(vote,voteJSON)
    .then(res=>res.data)
    .then(err=>err)
    console.log(resultVote)
    return  resultVote
}
export const CPD = async(name) => {
    if(name===null || name ===undefined)return new Error('Invalid Request!')
    const resultCPD =  axios.get(pdisclosure + name)
    .then(res=>res)
    .then(err=>err)
    return  resultCPD
}