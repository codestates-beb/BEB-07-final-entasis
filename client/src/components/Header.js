import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react'
import Modal from "react-modal"
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import '../assets/css/main.css';
import {FaucetWallet, EnrollWallet, ChName, Tutorial, Score, Position, Account} from '../apis/user'
// import {Vote} from '../apis/company'
const Header =({/*user*/})=> {
    const [userModalIsOpen, setUserModalIsOpen] = useState(false)
    const [isFaucet, setIsFaucet] = useState(false)
    const [name, setName] = useState("aa");
    const [stName, setStName] = useState('BEBE');
    const [stAmount, setStAmount] = useState(0);
    const [ratio, setRatio] = useState(0);

    const countNumber=(e)=>{
        return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    }

    const modalStyle = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            zIndex: 10,
        },
        content: {
            display: "block",
            justifyContent: "center",
            background: "#2B2B2B",
            overflow: "hidden",
            top: "0",
            left: "80%",
            right: "0",
            bottom: "0",
            border:"0",
            borderRadius: "0",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 10,
            
        },
    };


    let data ={
        name:'', 
        assets:{
        total:'', 
        st:[{st_name:'',st_price:'',st_amount:''},
        {st_name:'',st_price:'',st_amount:''},
        {st_name:'',st_price:'',st_amount:''},]},
        deposit:{is_fauceted : true || false,}}
    const ST_1 = {
            name:'BEBE',
            price:'200',
            amount:'20'
        };
    const ST_2 = {
        name:'DEDE',
        price:'100',
        amount:'230'
    };
    const ST_3 = {
        name:'CECE',
        price:'400',
        amount:'10'
    };
    const userModalOpen =()=>{
        document.body.style.overflow = 'hidden';
        setUserModalIsOpen(true)
        }
    const userModalClose =()=>{
        document.body.style.overflow = 'unset';
        setUserModalIsOpen(false)
        }

    const {chainId, account, active, activate, deactivate} = useWeb3React();

    const handdleConnect = () => {
        if(active) {
            deactivate();
            return;
        }

        activate(injected, (error) => {
            if('/No ethereum provider was found on window.ethereum/'.test(error)) {
                window.open('https://metamask.io/download.html');
            }
        });
    }
    // useEffect(()=>{
    //     // return Vote(stName,stAmount,ratio,account).status.value
    // },[stName,stAmount,ratio,account])
    const user = {
        status:"success",
        name:'Russ',
        price:'400',
        visited:'true',
        cnt:'10'}

    useEffect(()=>{

        EnrollWallet(account)
    },[account])
    // ChName(account, name)
    const faucetBtn=()=>{
        FaucetWallet(account)
    }
    return(
        <div className="header">
        
            <Link to='/'>
                <img src={require('../assets/images/logo.png')}></img>
            </Link>
            <Link to='/'>
                <img src={require('../assets/images/ENTASIS.png')}></img>
            </Link>

            <div>
            <button type="button" onClick={handdleConnect}>{active ? 'disconnect' : 'connect'}</button><br/>
            <span>address : {account}<br/>chainId : {chainId}</span>
            </div>
            <div className='header_user'>
                <img src={require('../assets/images/user.png')} 
                onClick={active? ()=>userModalOpen():handdleConnect} alt='connection'></img>
            </div>
            <Modal
                appElement={document.getElementById('root') || undefined}
                onRequestClose={()=>userModalClose()}
                isOpen={userModalIsOpen}
                style={modalStyle}LoginLogin
            >   <div className='myaccount'>
                    <div className='close' onClick={()=>userModalClose()}>
                        <img src={require('../assets/images/close.png')}></img>
                    </div>
                    <div className='account_top'>
                        <h1>MyAccount</h1>
                    </div>
                    <div className='myaccount_wrapper'>
                        <div className='myaccount_wrapper_name_top'>
                            <h2>Name</h2>
                            <div className='btn' onClick={()=>faucetBtn()}><h6>Edit</h6></div>
                        </div>
                            <div className='user_name'>
                                <h3>{user.name + " (#" + chainId+ ")"}</h3>
                            </div>
                        <div className='assets'>
                            <h2>Assets</h2>
                            <div className='assets_wraper'>
                                <h4>{ST_1.name+" ("+ST_1.amount+")"+" "+countNumber(ST_1.price+"ETH")}</h4>
                                <h4>{ST_2.name+" ("+ST_2.amount+")"+" "+countNumber(ST_2.price+"ETH")}</h4>
                                <h4>{ST_3.name+" ("+ST_3.amount+")"+" "+countNumber(ST_3.price+"ETH")}</h4>
                            </div>
                        </div>
                        <div className='deposit'>
                            <h2>Deposit</h2>

                            <div className='deposit_wrapper'>
                                <div className='deposit_faucet'>
                                    <h4>{isFaucet?100:0}ETH</h4>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>Faucet</h6></div>
                                </div>
                                <div className='account_address'>
                                    <div className='account'>{account}</div>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>Copy</h6></div>
                                </div>

                            </div>

                        </div>

                        <div className='exercise_of_voting_rights'>
                            <h2>Exercise of Voting Rights</h2>
                            <div className='exercise_of_voting_rights_wrapper '>
                                <h3>Select Security Token</h3>
                                <select className='st_select'>
                                    <option disabled={false}>
                                        Select Your Security Token
                                    </option>
                                    <option value={ST_1.name}>{ST_1.name}</option>
                                    <option value={ST_2.name}>{ST_2.name}</option>
                                    <option value={ST_3.name}>{ST_3.name}</option>
                                </select>
                                <h3 className='exercise_of_voting_rights_wrapper head'>Dividend</h3>
                                <div className='exercise_of_voting_rights_wrapper body'>
                                    
                                    <div className='left'>
                                        <h5>Current</h5>
                                        <div className='ratio_value'>
                                            <h4>{}5%</h4>
                                        </div>
                                        <div className='vote_btn' onClick={()=>setRatio(0.05)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(0.04)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(0.03)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(0.02)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(0.01)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(0)}><h5>Vote</h5></div>
                                    </div>
                                    <div className='middle'>
                                        <h5>Result</h5>
                                        <div className='ratio_value'>
                                            <h4>{}0.03</h4>
                                        </div>
                                        <div className='vote_value up'><h5>+0.05</h5></div>
                                        <div className='vote_value up'><h5>+0.04</h5></div>
                                        <div className='vote_value up'><h5>+0.03</h5></div>
                                        <div className='vote_value up'><h5>+0.02</h5></div>
                                        <div className='vote_value up'><h5>+0.01</h5></div>
                                        <div className='vote_value'><h5>0.00</h5></div>
                                        <div className='vote_value down'><h5>-0.01</h5></div>
                                        <div className='vote_value down'><h5>-0.02</h5></div>
                                        <div className='vote_value down'><h5>-0.03</h5></div>
                                        <div className='vote_value down'><h5>-0.04</h5></div>
                                        <div className='vote_value down'><h5>-0.05</h5></div>

                                    </div>
                                    <div className='right'>
                                        <h5>Next</h5>
                                        <div className='ratio_value'>
                                            <h4>{}5.49%</h4>
                                        </div>
                                        <div className='vote_btn'><h5></h5></div>
                                        <div className='vote_btn'><h5></h5></div>
                                        <div className='vote_btn'><h5></h5></div>
                                        <div className='vote_btn'><h5></h5></div>
                                        <div className='vote_btn'><h5></h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(0)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(-0.01)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(-0.02)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(-0.03)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(-0.04)}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>setRatio(-0.05)}><h5>Vote</h5></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Header;