// const API_TOKEN = "pk_b357a793cf184f798b22ece36112c791"; //throwaway email
// const API_TOKEN = "pk_213bab875424446b80f0869547f9a6a7" //production api kayn022222
// const API_TOKEN = "pk_fa06e2b91bce45c6a774b2a1ae8c678b" //production2 api kayn05555
const API_TOKEN = "pk_4f9e50b094df4d02875f0fbbe622fc5a" //throwaway email
export const fetchStock = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/?token=${API_TOKEN}`
    })
)
export const fetchLatestStockPrice = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=${API_TOKEN}&symbols=${ticker}`
    })
)
// https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=${API_TOKEN}&symbols=${ticker}


// url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?&types=quote&token=${window.iexAPIKey}`,

export const fetchCompanyInfo = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?types=quote&filter=description,exchange,companyName,city,state,CEO,employees&token=${API_TOKEN}`
    })
)
export const fetchStockStats = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/stats/batch?types=quote&filter=peRatio,avg10Volume,dividendYield,week52high,week52low,marketcap&token=${API_TOKEN}`
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
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}/batch?types=quote&token=${API_TOKEN}`
    })
)
export const fetchIntradayData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/batch?&types=quote,chart&range=1D&chartInterval=5&token=${API_TOKEN}`
    })
)
export const fetchHistoricalData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/batch?&types=quote,chart&range=5Y&chartInterval=5&token=${API_TOKEN}`
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