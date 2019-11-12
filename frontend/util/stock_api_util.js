// const API_TOKEN = "pk_213bab875424446b80f0869547f9a6a7" //production api kayn022222
// const API_TOKEN = "pk_fa06e2b91bce45c6a774b2a1ae8c678b" //production2 api kayn05555
const API_TOKEN = "pk_507026b3e85f4e4a889d2c112c20b532" //kayn0222

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
export const fetch5YrHistoricalData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/batch?&types=quote,chart&range=5Y&token=${API_TOKEN}`
    })
)
export const fetch1YrHistoricalData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/batch?&types=quote,chart&range=1Y&token=${API_TOKEN}`
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