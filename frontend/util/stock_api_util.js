// const apiKey = "pk_b357a793cf184f798b22ece36112c791"; //throwaway email

// const apiKey = "pk_213bab875424446b80f0869547f9a6a7" //production api kayn022222
const apiKey = "pk_fa06e2b91bce45c6a774b2a1ae8c678b" //production2 api kayn05555
export const fetchStock = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/?token=${apiKey}`
    })
)
export const fetchLatestStockPrice = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=${apiKey}&symbols=${ticker}`
    })
)
// https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=${apiKey}&symbols=${ticker}


// url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?&types=quote&token=${window.iexAPIKey}`,

export const fetchCompanyInfo = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?types=quote&filter=description,exchange,companyName,city,state,CEO,employees&token=${apiKey}`
    })
)
export const fetchStockStats = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/stats/batch?types=quote&filter=peRatio,avg10Volume,dividendYield,week52high,week52low,marketcap&token=${apiKey}`
    })
)
export const fetchStocks = () => (
    $.ajax({
        method: "GET",
        url: `api/stocks`
    })
)
export const fetchStockChart = (ticker,range) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}/batch?types=quote&token=${apiKey}`
    })
)
export const fetchIntradayData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1D/batch?&types=quote&chartInterval=5&token=${apiKey}`
    })
)
export const fetchHistoricalData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5Y/batch?types=quote&token=${apiKey}`
    })
)
// /stock/aapl/chart
// /stock/aapl/chart/max
// /stock/aapl/chart/5y
// /stock/aapl/chart/2y
// /stock/aapl/chart/1y
// /stock/aapl/chart/ytd
// /stock/aapl/chart/6m
// /stock/aapl/chart/3m
// /stock/aapl/chart/1m