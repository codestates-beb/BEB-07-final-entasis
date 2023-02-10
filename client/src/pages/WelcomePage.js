import { useEffect, useState } from 'react'
import {Tutorial} from '../apis/user'
const WelcomePage =({isLoading, tutorialCnt, account,isWelcome,setIsWelcome})=>{
    const [welcomeClose, setWelcomeClose] = useState(false)
    useEffect(()=>{
        Tutorial(account,tutorialCnt)
    },[account,tutorialCnt])

let welcomeOverflow =  document.body.style.overflow
    if(isLoading){
    return (<div
            className="welcome logo"  >
            <img className="logo" src={require('../assets/images/ENTASIS_white.png')} alt="loading"/>
            <img src={require('../assets/images/Infinity.gif')} alt="loading"/>
            </div>)
    } else if(!welcomeClose&&!isWelcome){return (
        <div className="welcome" onClick={()=>
        {setWelcomeClose(true)
            setIsWelcome(!isWelcome)
        }}  >
            <img src={require('../assets/images/welcome.png')} alt="welcome"/>
        </div>
    )}
}
export default WelcomePage