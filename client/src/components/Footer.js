import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useLocation } from 'react-router-dom';

const Footer =({setIsCircuitBreaker})=>{
    const [isRestricted,setIsRestricted] = useState({});
    const [circuitModal,setCircuitModal]=useState(false)
    let [circuitBreakerTimer,setCircuitBreakerTimer] = useState(60)
    let i = 60 ;

    useEffect(()=>{
        if(circuitModal){
        const setTime = setInterval(()=>{
            if(i>0){
                i--
                setCircuitBreakerTimer(i)
            }else{
                clearInterval(setTime)
                setIsCircuitBreaker(false)
            }
        },1000)}
    },[circuitModal,i])



    const{pathName} = useLocation()

    useEffect(()=>{
    },[pathName])

    const restrict = "http://localhost:5050/restrict";  

    const Restrict = async(wallet) => {
        window.scrollTo(0,0)
        setIsCircuitBreaker(true)
        setCircuitModal(true)
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultRestrict =  await axios.post(restrict)
        .then(res=>res.data)
        .then(err=>console.log(err))
        console.log(resultRestrict)
    }
    const modalStyle_2 = {
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
            background: "#222223",
            overflow: "hidden",
            top: "15%",
            left: "33%",
            right: "33%",
            bottom: "15%",
            border:"0",
            borderRadius: "20px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 10,
            opacity:0.9
        },
    };
        

    return(
    <div className="footer">
        <div className="footer_assets_top">
            <div className='chains'>
                <i className='fab fa-bitcoin'/>
                <i className='fab fa-ethereum'/>
            </div>
            <div className='social'>
                <i className='fab fa-facebook-f'/>
                <i className='fab fa-instagram'/>
                <i className='fab fa-reddit-alien'/>
                <i className='fab fa-youtube'/>
                <i className='fab fa-tiktok'/>
                <i className='fab fa-google'/>
                <i className='fab fab fa-apple'/>
            </div>
        </div>
        <div className="footer_top">
        
            <div className='footer_top_left'>
            <img className='footer_logo' src = {require('../assets/images/logo_blue.png')} alt='logo'/>
            <img className='footer_name' src = {require('../assets/images/ENTASIS_white.png')} alt='logo'/>

                <div className='footer_top_left_introduce'>
                    <h5>블록체인기반 거래소 ENTASIS</h5>
                    <h5>기업의 자금 조달을 위한 STO(Security Token Offering : 보안토큰공개)를 </h5>
                    <h5>주관하며, 투자자는 ST(Security Token: 보안토큰)를 매매 할 수 있다.</h5>
                </div>
            </div>
            <div className='footer_top_right'>
            <div className='team_introduce_member'>
            </div>
                <div className='team_introduce'>
                    <div className='team_introduce_member'>
                        <h5>윤수빈 <a href='https://velog.io/@nft_sb'>blog</a></h5>
                        <h5>yunsubin481@gmail.com</h5>
                    </div>
                    <div className='team_introduce_member'>
                        <h5>김현태 <a href='https://www.notion.so/7eb68268711f40619020318efcaeca0c'>blog</a></h5>
                        <h5>hyuntae384@gmail.com</h5>
                    </div>
                    <div className='team_introduce_member'>
                        <h5>백준석 <a href='https://bajnsk.tistory.com/1'>blog</a></h5>
                        <h5>baekjunseok63@gmail.com</h5>
                    </div>
                    <div className='team_introduce_member'>
                        <h5>박도형 <a href='https://shapespark.tistory.com/'>blog</a></h5>
                        <h5>slstls218@gmail.com</h5>
                    </div>
                    </div>

                    </div>
                </div>
                <div className="footer_body">
                <div className='footer_body_left'>
                    <h5>ST의 기능은 지분의 토큰화, 거래내역 공개, 차기 배당율 투표 의결권 행사가 있으며,</h5>
                    <h5>기준 이상의 변동성 발생 시 서킷브레이커와 같은 거래제한 기능을 적용할 수 있다.</h5>
                    <h5>모든 기능은 스마트 컨트랙트 내에서 이루워지며, 트랜젝션 스캔에서 그 내역을 확인할 수 있다.</h5>
                    <h5>ERC - 1400을 기준으로 개발하였다.</h5>
                </div>
                <div className='footer_body_right'>
                    <div className='circuit_breaker'>
                        <h5> 
                        <a className='circuit_breaker_link' href='https://namu.wiki/w/%EC%84%9C%ED%82%B7%EB%B8%8C%EB%A0%88%EC%9D%B4%EC%BB%A4'>Circuit Breaker</a>
        는 주가의 급격한 변동으로 주식 시장이 단숨에 붕괴되는 것을 막기 위해 세계 각국에서 도입한 제도. 조건에 맞는 상황이 오면 일정시간 동안 주식시장 거래를 전면 중단시키는 제도이다. 미국은 20분(15분 거래중단+5분 동시호가), 대한민국은 30분(20분 거래중단+10분 동시호가) 거래를 중단시킨다. 다만 하락시에만 발동하는건 아니고 폭등 때도 발동할 수 있다.</h5>
        <div className='circuit_breaker_top'>
                    <div className='circuit_breaker_btn' onClick={Restrict} >
                        <img src={require('../assets/images/danger.png')}alt='danger'></img>
                    </div>
                    <h1>Circuit Breaker</h1>
                </div>
                <ReactModal
                    appElement={document.getElementById('root') || undefined}
                    onRequestClose={()=>setCircuitModal(!circuitModal)}
                    isOpen={circuitModal}
                    style={modalStyle_2}>
                    <div className='warning_circuit_breaker'>
                        <h1>Circuit Breaker</h1>
                        <h3>All Security Token Trading is Restricted</h3>
                        <img src={require('../assets/images/warning.gif')}/>
                        <h5>A trading curb (also known as a circuit breaker[1] in Wall Street parlance) is a financial regulatory instrument that is in place to prevent stock market crashes from occurring, and is implemented by the relevant stock exchange organization. Since their inception, circuit breakers have been modified to prevent both speculative gains and dramatic losses within a small time frame. When triggered, circuit breakers either stop trading for a small amount of time or close trading early in order to allow accurate information to flow among market makers and for institutional traders to assess their positions and make rational decisions.</h5>
                        <div className="is_circuit_breaker">
                            <h4>Circuit Breaker {'00:'+circuitBreakerTimer}</h4>
                        </div> 
                    </div>
                </ReactModal>

</div>
        </div>


        </div>
        <div className="footer_bottom">

        </div>

    </div>
    )
}
export default Footer