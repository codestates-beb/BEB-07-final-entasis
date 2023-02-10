const Asset =({
    price,
    amount,
    total_dividend_income,
    dividend_income_ratio,
    })=>{
    return(
        <div className="asset_wrapper">
            <div className="asset_price">
                {(price*amount).toFixed(3)}
            </div>
            <div className="asset_amount">
                {amount}
            </div>
            <div className="asset_dividend_income_ratio">
                {Number(total_dividend_income).toFixed(3)}
            </div>
            <div className="asset_date">
                {Number(dividend_income_ratio).toFixed(7)}
            </div>
        </div>
    )
}
export default Asset