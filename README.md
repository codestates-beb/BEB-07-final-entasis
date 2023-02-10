# Project_Entasis



[https://youtu.be/PSVpth7uqb4?t=650](https://youtu.be/PSVpth7uqb4?t=650)

# 👨‍👨‍👧‍👧 참여자

|Name|Role|Github|Blog|
|---|-----|---|---|
|윤수빈|Frontend|https://github.com/Russ481-k|작성|
|백준석|Frontend|https://github.com/bajnsk|작성|
|김현태|Backend|https://github.com/hyuntae384|작성|
|박도형|Backend|https://github.com/pdhyeong|https://shapespark.tistory.com/|


# **Security Token Trading Platform**

[글로벌 자산운용사 블랙록](https://ko.wikipedia.org/wiki/%EB%B8%94%EB%9E%99%EB%A1%9D_(%EA%B8%B0%EC%97%85))의 대표 래리핑크는 **2022. 12. 1.** 인터뷰 (10:52 ) 에서

STO를 통해 현재 증권 거래 비용에 포함된 브로커들의 수수료를 매매 당사자들에게 나누어주어 수수료가 낮아질 것이고 투표 또한 STO 소유자들이 할 수 있게 될 것을 말합니다. 블랙록 자산운용사 대표의 STO에 대한 인식은 프로젝트 주제 선정에 결정에 도움을 주었습니다.

**기업이 STO 할 수 있는 거래소를 만듭니다.**

- 기업의 STO를 통한 자금 조달 환경을 조성합니다.
- 개인은 계정을 만들어 ST를 매매할 수 있습니다.
- 소유한 ST 지분에 따라 단위 기간 마다 배당을 받습니다.
- 소유한 ST 의결권으로 단위 기간 마다 배당수익률을 정하는 투표를 할 수 있습니다.

1. 거래소 Entasis를 만들어 해당 Entasis에서 발행하는 ENTA토큰으로 특정 자산에 투자할 수 있습니다.
    1. Entasis는 당사의 자산 70%로 발행 된 ENTA토큰을 전량 매수합니다.
    2. (자본금/토큰의 개수) = 토큰의 가격 
        1. ENTA 토큰의 가격은 1원 = 1ENTA로 고정합니다.
        2. 즉, 프로젝트 내에서는 ENTA 토큰의 매매가 불가하며 Exchange만 가능 합니다.
    3. 투자자는 Entasis에서 가입 시에 제공된 지갑으로 가상 자산을 Deposit 합니다.
    4. Deposit 된 가상 자산을 ENTA 토큰으로 Exchange 합니다.

1. 투자자는 ENTA토큰을 지불하여 STO된 Security Token(ST)을 매매할 수 있습니다.
    - MT와 개인은 Exchange한 ENTA토큰을 통해 ST를 매매할 수 있습니다.

1. 기업 BEBE는 Entasis에서 Initial Coin Offering (ICO)를 합니다. 
    
    [**Utility Token vs Security Token**](https://www.blockchain-council.org/blockchain/security-tokens-vs-utility-tokens-a-concise-guide/)(링크)
    
    
    
    - BEBE는 ST를 매매하지 않는 것으로 가정
        - [유상증자, 무상증자, 유상감자, 무상감자](https://googlle.tistory.com/5)의 경우는 고려하지 않음
            
           
            
        - 단, [Buy Back Rights](https://www.lawinsider.com/clause/buy-back-rights) (환매권)의 구현은 추후 결정
            - 환매권은 토큰을 배정 받은 후  일정 기간 내에 토큰을 STO 기업이 판매 가격으로 매입 해 줌을 보증해 주는 권리.(즉, 토큰 무상 반품 제도)
            - 다만 환매권이 토큰 공모의 권리로 해석될 경우 구현하지 않음
        
    - ICO가 진행됩니다
        
       
        
        [증권의 공모(출처 : 한국거래소)](https://kind.krx.co.kr/external/dst/guidebook/2022_KRX_guidebook.pdf)
        
        - 공모과정은 기업공개에서 중요한 과정이나, 본 프로젝트에서는 다음과 같이 축약 합니다.
            - Entasis에서 STO 된 BEBE Token의 가격은 다음과 같이 정의합니다.
                - BEBE Token Price = (기업 BEBE의 계정의 잔액 / BEBE Token 총 발행량)
            - Utility Token을 MM(LP)과 MT에게 각각 30%, 50% 배정하며 BEBE계정에 입금됩니다.
                - [MM과 MT](https://www.cmegroup.com/education/courses/trading-and-analysis/market-makers-vs-market-takers.html)
                    - 유동성 공급자(LP, Liquidity Provider)란 금융 상품에 대한 매매가 원활하게 이루어질 수 있도록 매도∙매수 호가를 지속적으로 제시하는 시장 참가자를 말합니다.
            - 개인의 Orders for ICO shares(공모 토큰 사전 청약)은 MT 배정에 포함됩니다.
        - 이후 기업의 공시 의무로 BEBE Account는 실시간 공개됩니다.
            
            
2. BEBE Token을 ENTA 토큰으로 매매할 수 있습니다.
    
    MainPage & Modals Design
    
  
    
    1. A의 계정이 BEBE Token을 X만큼 매수할 경우  
        - BEBE Token Price = (기업 BEBE의 계정의 잔액 + AX /BEBE Token)
        - 가격이 상승
        
    2. A의 계정이 BEBE Token을 Y만큼 매도할 경우  
        - BEBE Token Price = (기업 BEBE의 계정의 잔액 - AY /BEBE Token)
        - 가격이 하락
        
    3. BEBE이외의 MT계정(B)이 BEBE Token을 X만큼 매수할 경우  
        - BEBE Token Price = (기업 BEBE의 계정의 잔액 + BX /BEBE Token)
        - 가격이 상승
        
    4. BEBE이외의 MT계정(B)이 BEBE Token을 Y만큼 매도할 경우 
        - BEBE Token Price = (기업 BEBE의 계정의 잔액 - BY /BEBE Token)
        - 가격이 하락
        
     
        
3. 기업은 Security Token Offering(STO)를 할 수 있습니다.
    1. STO 당사 BEBE 계정은 일정 시간이 지남에 따라 (i)수익을 얻고 토큰 소유자에게 (ii)배당되며, 배당은 (iii)수익의 일정 부분을 토큰으로 발행하여 지분율에 따라 지급됩니다.
        1. 수익은 BEBE의 계정에 가산됩니다.
            - BEBE는 [계속기업(Going Concern)](https://www.kifrs.com/s/1001/b866bd)을 가정하여 일정 기간 마다 지속적으로 수익을 얻습니다.
                - BEBE계좌 단위기간(1시간) 당기순이익 = BEBE 자본금(S) * 0.01%
            - 배당 후 잔여이익금은 BEBE 계정에 귀속, 유보 이익으로 재투자 됩니다.
            
        2. 토큰 보유량에 따라 토큰이 배당됩니다.
            - BEBE 계좌는 지속적으로 증가하며 순이익의 일부를 배당수익률에 따라 배당합니다.
            - BEBE 토큰 소유자는 단위기간(1시간)마다 배당 받을 수 있습니다.
                - 토큰 당 배당금 = (BEBE 순이익 * 당기 배당수익률) / 총 발행 BEBE 토큰 수량
                - 단위기간은 테스트를 위해 변동할 수 있습니다.
                
        3. 초기 연간배당수익률( 배당금 / 순이익 )은 3%로 합니다.
            - 2022년 [글로벌 평균 배당 수익률인 3%](https://www.samsungpop.com/common.do?cmd=down&saveKey=research.pdf&fileName=2020/2022120710024942K_02_18.pdf&contentType=application/pdf#:~:text=WHAT'S%20THE%20STORY%3F,%EC%9D%98%203.3%25%EC%97%90%20%EB%B9%84%ED%95%B4%20%EB%82%AE%EB%8B%A4.)를 기준으로 합니다.
            - 즉 초기 배당 수익률 0.03 / 365 * 24 = 0.0034% (1시간 기준)
            
        4. 토큰으로 [배당](https://ko.wikipedia.org/wiki/%EB%B0%B0%EB%8B%B9)되는 순이익 대비 배당금의 비율은 토큰을 소유한 사람들의 투표로 인해 결정됩니다.
            - BEBE 토큰 소유자는 단위기간(1시간)마다 투표를 하여 당기 배당수익률을 결정 할 수 있습니다.
                - 초기배당 수익률 = 0.0034%
                - 당기 배당수익률(t) = 전기 배당수익률(t - 1) * (1 + 당기 선출 변동률)
                - 차기 배당수익률(t+1) = 당기 배당수익률(t) * (1+ 차기 선출 변동률)
            - 토큰 소유자는 지분율에 따라 의결권을 행사합니다.
                - 지분율 = (소유중인 토큰의수량/토큰 총 발행 수량)
            - MM과 MT의 지분 의결은 배당수익률 제한 변동폭(| 0.05 |) 안에서 난수값으로 결정됩니다.
            - 차기 배당수익률 = 당기 배당수익률 * (1 + | 0.05 |)
            - 배당수익률 변동폭의 최소단위는 0.01단위로 제한 하며 투표되는 선택지는 다음과 같습니다.
                1. +0.05
                2. +0.04
                3. +0.03
                4. +0.02
                5. +0.01
                6. 0.00 (변동 없음)
                7. -0.01
                8. -0.02
                9. -0.03
                10. -0.04
                11. -0.05 
            - 가장 많은 의결권으로 결정된 비율이 기존 배당수익률에 가산되어 차기 배당수익률이 됩니다.
                1. 당기 배당수익률(t) * (1 + 차기 선출 변동율) = 차기 배당수익률(t+1)
            

1. Pages Compose
    - MainPage
        - Chart
        - LimitOrderBook
        - Order
        - OrderList
        - Position
        - Modal
            - Login
            - Signup
    
    - InvesterAccountPage
        - Deposit
        - Withdraw
        - Exchange
        - Transfer
    
    - Public Disclosure
        - Financial Statements
        - Exercise of Voting Rights
        
    
2. To Do List
    
    
    - Bare Minimum(현물 거래)
        - 각 계정에서 자신의 매매 기록 및 수익률을 확인할 수 있다.
        - MainPage
            - 모달을 통해 로그인 로그아웃을 할 수 있다.
            - Deposit, Withdraw, Exchange를 할 수 있다.
                - Deposit을 통해 외부 토큰을 지갑에 넣을 수 있다.
                - Exchange에서 지정된 가격으로 외부 토큰을 ENTA 토큰으로 교환할 수 있다
                - 투자자는 ENTA 토큰으로 ST를 거래할 수 있다.
                - 기업은 STO를 통해 자금조달을 할 수 있다.
            - Market Page에서 투자를 할 수 있다.
                - [**밴치마크 페이지**](https://www.bitget.com/en-GB/spot/BTCUSDT_SPBL?type=spot)
                
               
                
    - Recommended
        - 시장의 견고성
            - MM과 MT가 ENTA 토큰으로 ST토큰 가격을 일정 변동 폭 안에서 유지할 수 있다.
                
                i) [MM과 MT](https://www.cmegroup.com/education/courses/trading-and-analysis/market-makers-vs-market-takers.html)
                
                1. 정상 시장을 조성하기 위해 변동성을 일으킬 가상의 MT계정이 있습니다.
                    1. MT계정은 년, 월, 주, 일, 시, 분, 초에 각각 난수 값을 자기자본의 50%에 가중한 금액으로 [Security Token(ST)](https://www.investopedia.com/terms/s/security-token.asp)를 매수 또는 매도합니다.
                2. 정상 시장을 조성하기 위해 [호가창(LimitOrderBook)](https://www.investopedia.com/terms/l/limitorderbook.asp) 구성은 MM역할을 하는 LP계정을 두어 각 호가에서 거래를 원활하게 도울 수 있도록 주문을 올립니다.
                    1. 유동성 공급자(LP, Liquidity Provider)란 금융 상품에 대한 매매가 원활하게 이루어질 수 있도록 매도∙매수 호가를 지속적으로 제시하는 시장 참가자를 말합니다.
            - LP가 최소 호가로 |10단위| 총 20단위의 호가를 지속적으로 유지할 수 있다.
            
    - Advenced
        - STO를 통해 배당을 받을 수 있다.
            - BEBE 계좌는 지속적으로 증가하여 배당한다.
                - BEBE계좌 단위기간(1시간) 당기순이익 = BEBE 자본금(S) * 0.01
            - BEBE 토큰 소유자는 단위기간(1시간)마다 배당을 받을 수 있다.
                - 배당금 = 당기순이익 * (1 + 당기 배당수익률)
            - BEBE 토큰 소유자는 단위기간(1시간)마다 투표를 하여 차기 배당수익률을 결정 할 수 있다.
                - 당기 배당수익률(t) = 전기 배당수익률(t - 1) * (1 + 선출 변동률)
        - 차트를 통해 투자 의사결정을 할 수 있다.
        
    - Nightmare(선물 거래)
        - BEBE Token을 기초자산으로 하는 BEBE Future ([CME](http://cmegroup.com/ko/education/learn-about-trading/courses/introduction-to-futures.html))거래가 가능하다.
        - 레버리지 비율을 선택할 수 있다.
        - 레버리지 비율에 따라 증거금과 수수료를 차등하여 포지션을 제공할 수 있다.
        - **[밴치마크 페이지](https://www.bitget.com/en-GB/mix/usdt/BTCUSDT_UMCBL)**
            
           
            
    
    - Hell(옵션 거래)
        - BEBE Future을 기초자산으로 하는 BEBE Option ([CME](https://www.cmegroup.com/ko/education/learn-about-trading/courses/introduction-to-options/introduction-to-options.html))거래가 가능하다
            - 옵션의  MarkPrice를 [블랙숄즈방정식](https://ko.wikipedia.org/wiki/%EB%B8%94%EB%9E%99-%EC%88%84%EC%A6%88_%EB%AA%A8%ED%98%95)으로 도출할 수 있다.
            - 변동성과 유동성으로 증거금을 정하여 옵션 포지션을 제공할 수 있다.
            - 각 만기에 해당하는 옵션 상품을 리스팅할 수 있다.
            - 리스팅 된 옵션 상품을 매매할 수 있다.
            - **[밴치마크 페이지](https://www.bybit.com/trade/option/usdc/BTC)**
            
            
            

 
# 사용기술 스택
## plan & editor
<div>
    <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
    <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
</div>

## Fronted
<div>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
    <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
</div>

## Backend
<div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
</div>

## Blockchain
<div>
    <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=Solidity&logoColor=white">
    <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white">
    <img src="https://img.shields.io/badge/ganache-FECC00?style=for-the-badge&logo=ganache&logoColor=white">
    <img src="https://img.shields.io/badge/truffle-6C595C?style=for-the-badge&logo=truffle&logoColor=white">
    <img src="https://img.shields.io/badge/Remix-000000?style=for-the-badge&logo=Remix&logoColor=white">
</div>

## Database
<div>
    <img src="https://img.shields.io/badge/AWS RDS-527FFF?style=for-the-badge&logo=AWS RDS&logoColor=white">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"> 
</div>

## Deploy
<div>
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
    <img src="https://img.shields.io/badge/Github Actions-2088FF?style=for-the-badge&logo=Github Actions&logoColor=white">
    <img src="https://img.shields.io/badge/amazon EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
    <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
</div>
