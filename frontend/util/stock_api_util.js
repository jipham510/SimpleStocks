const apiKey = "pk_de82e1c265ce403880d83e5d17770609";
export const fetchStock = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/?token=${apiKey}`
    })
)
export const fetchLatestStockPrice = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5d/?filter=close&chartLast=1&token=${apiKey}`
    })
)

// url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?&types=quote&token=${window.iexAPIKey}`,

export const fetchCompanyInfo = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?types=quote&filter=description,companyName,city,state,CEO,employees&token=${apiKey}`
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