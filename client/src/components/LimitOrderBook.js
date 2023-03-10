import { useTranslation } from "react-i18next";
const LimitOrderBook =({ST_CurrentPrice, powerOfMarket})=>{
    const {t} = useTranslation();
    
    //MM
    //CP 위 아래로 5칸의 호가 구성
    //물량은 cp에서 멀어질수록 많아짐
    //호가단위 = 토큰가격/100 5단위 올림
    ST_CurrentPrice=Number(ST_CurrentPrice)
    let priceSet = 0.01;
    let orderList = [];
    for(let i =0;i<7;i++){
            //매수, 매도세를 알 수 있는 지표는?
            //가격이 오른 정도 * 실려있는 거래량?
        let amountBuySet = (powerOfMarket>0?(powerOfMarket*5):(-powerOfMarket)).toFixed(2);
        let amountSellSet = (powerOfMarket<0?(powerOfMarket*5):(-powerOfMarket)).toFixed(2);
        let sellOrder= {
            id:4-i,
            name:"bebe",
            price:(ST_CurrentPrice+priceSet*(i+1))>0?(ST_CurrentPrice+priceSet*(i+1)).toFixed(2):0,
            amount:(-amountSellSet*(i+1))>1?(-amountSellSet*(i+1)).toFixed(2):(i+1)*3,
        };

        let buyOrder={
            id:5+i,
            name:"bebe",
            price:(ST_CurrentPrice-priceSet*(i+1))>0?(ST_CurrentPrice-priceSet*(i+1)).toFixed(2):0,
            amount:(amountBuySet*(i+1))>1?(amountBuySet*(i+1)).toFixed(2):(i+1)*3,
        };        

        orderList[6-i] = sellOrder
        orderList[8+i] = buyOrder

    }

    // let SVG_VOLUME_WIDTH =  typeof width === "number" ? width * 1 : 0;
    // let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 0.3 : 0;

    // const xForPrice = 75;
    // const xAxisLength = SVG_VOLUME_WIDTH - xForPrice;
    // const yAxisLength = SVG_VOLUME_HEIGHT;

    // const dataYMax = dataArray.reduce(
    //     (max, [_, open, his_to, his_from]) => Math.max(his_to, volumeData[2], max),
    //     -Infinity
    // );

    // const dataYMin = 0
    // const dataYRange = dataYMax;
    // const numYTicks = 7;
    // const barPlothWidth = xAxisLength / (dataArray.length+1.2);
    return(
    <div className="limit_order_book">
        <div className="limit_order_book_menu">
            <h4>{t("Order")}</h4>
            <h4>{t("Price")}</h4>
            <h4>{t("Amount")}</h4>
            <h4>{t("Total")}</h4>
        </div>
        {orderList.map((e)=>{
            return(
                <div key={e.id}>
                    {e.id<5?
                    <div className="limit_order_buy">
                        <div>{'Sell'}</div>
                        <div>
                            {e.price}
                        </div>
                        <div>{e.amount}</div>
                        <div>
                        {/* {console.log(orderList)} */}

                        <div>{(e.price*e.amount).toFixed(1)}</div>
                        </div>
                    </div>  
                    :<></>}
                </div>
            )
            })}
            <div className="market_order">
                    <h3>{t("Market Price")}</h3>
                    <h3>{!isNaN(ST_CurrentPrice)?(ST_CurrentPrice>1000?ST_CurrentPrice.toFixed(0):(ST_CurrentPrice>100?ST_CurrentPrice.toFixed(1):(ST_CurrentPrice>10?ST_CurrentPrice.toFixed(2):(ST_CurrentPrice>1?ST_CurrentPrice.toFixed(3):ST_CurrentPrice)))):<></>}</h3>
                    <h3>ETH</h3>
            </div>
            {orderList.map((e)=>{
                return(
                    <div  key={e.id}>
                        {e.id>4?
                            <div className="limit_order_sell">
                            <div>{'Buy'}</div>
                            <div>{e.price}</div>
                            <div>{e.amount}</div>
                            <div>{(e.price*e.amount).toFixed(1)}</div>
                        </div>:<></>}
                    </div>
                )})}
                {/* 호가창 거래량 UX 향상을 위한 그래프*/}
                {/* <svg width={SVG_VOLUME_WIDTH} height={SVG_VOLUME_HEIGHT}>

                    {orderList.map(
                    (
                        [
                        id,
                        name,
                        price,
                        amount,
                        ],
                        index
                    ) => {
                        const x = id * barPlothWidth;
                        const sidePadding = xAxisLength * 0.0015;
                        let yRatio = 0;
                        const yRatioGenerator = () => {
                            yRatio = (his_to - dataYMin) / dataYMax;
                            if (yRatio > 0) {
                            return yRatio;
                            } else return (yRatio = his_to / dataYRange / 2);
                        };

                        const y =(1 - yRatioGenerator()) * yAxisLength;
                        const fill = id < 4 ? "#b8284a" : "#00A4D8" ;
                        return (
                        <g key={index}>
                            <rect
                            {...{ fill }}
                            x={x}
                            y={y}
                            width={barPlothWidth - sidePadding}
                            height={height}
                            ></rect>
                        </g>
                        );
                    }
                    )}
            </svg> */}
    </div>
    
    )
}
export default LimitOrderBook