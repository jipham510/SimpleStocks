export const fetchStock = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/?token=pk_507026b3e85f4e4a889d2c112c20b532`
    })
)
export const fetchLatestStockPrice = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5d/?filter=close&chartLast=1&token=pk_507026b3e85f4e4a889d2c112c20b532`
    })
)

// url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?&types=quote&token=${window.iexAPIKey}`,

export const fetchCompanyInfo = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?types=quote&filter=description,companyName,city,state,CEO,employees&token=pk_507026b3e85f4e4a889d2c112c20b532`
    })
)
export const fetchStockStats = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/stats/batch?types=quote&filter=peRatio,avg10Volume,dividendYield,week52high,week52low,marketcap&token=pk_507026b3e85f4e4a889d2c112c20b532`
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
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}/batch?types=quote&token=pk_507026b3e85f4e4a889d2c112c20b532`
    })
)
export const fetchIntradayData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1D/batch?&types=quote&chartInterval=5&token=pk_507026b3e85f4e4a889d2c112c20b532`
    })
)
export const fetchHistoricalData = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5Y/batch?types=quote&token=pk_507026b3e85f4e4a889d2c112c20b532`
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