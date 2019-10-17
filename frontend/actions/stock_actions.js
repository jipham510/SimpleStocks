import * as APIStockUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_INTRADAY_DATA = "RECEIVE_INTRADAY_DATA";
export const RECEIVE_HISTORICAL_DATA = "RECEIVE_HISTORICAL_DATA";
export const RECEIVE_LATEST_STOCK_PRICE = "RECEIVE_LATEST_STOCK_PRICE";
export const RECEIVE_COMPANY_INFO = "RECEIVE_COMPANY_INFO";
export const RECEIVE_STOCK_STATS = "RECEIVE_STOCK_STATS";
export const RECEIVE_STOCK_CHART = "RECEIVE_STOCK_CHART";
export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const TICKER_NOT_FOUND = "TICKER_NOT_FOUND";

const receiveStock = (stock) => {
    return {
        type: RECEIVE_STOCK,
        stock: { name: stock.companyName, ticker: stock.symbol }
    }
}
const receiveLatestStockPrice = (stock,ticker) => {
    return {
        type: RECEIVE_LATEST_STOCK_PRICE,
        stock: { price: stock[ticker].quote.latestPrice, ticker: ticker }
    }
}
const receiveStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    stocks
})
const receiveCompanyInfo = (company_info,ticker) => ({
    type: RECEIVE_COMPANY_INFO,
    ticker,
    company_info
})
const receiveStockStats = (stats,ticker) => ({
    type: RECEIVE_STOCK_STATS,
    ticker,
    stats
})

const receiveStockChart = (chartData,ticker) => ({
    type: RECEIVE_STOCK_CHART,
    ticker,
    chartData
})
const receiveIntradayData = (intradayData,ticker) => ({
    type: RECEIVE_INTRADAY_DATA,
    ticker,
    intradayData
})

const receiveHistoricalData = (historicalData,ticker) => ({
    type: RECEIVE_HISTORICAL_DATA,
    ticker,
    historicalData
})
const tickerNotFound = ticker => ({ type: TICKER_NOT_FOUND, ticker });

export const fetchStock = (ticker) => (dispatch) => APIStockUtil.fetchStock(ticker).then( stock => dispatch(receiveStock(stock)))

export const fetchLatestStockPrice = (ticker) => (dispatch) => APIStockUtil.fetchLatestStockPrice(ticker).then(stock => dispatch(receiveLatestStockPrice(stock,ticker)))

export const fetchCompanyInfo = (ticker) => (dispatch) => APIStockUtil.fetchCompanyInfo(ticker).then(company_info => dispatch(receiveCompanyInfo(company_info,ticker)))

export const fetchStockStats = (ticker) => (dispatch) => APIStockUtil.fetchStockStats(ticker).then(stats => dispatch(receiveStockStats(stats,ticker)))

export const fetchStockChart = (ticker,range) => (dispatch) => APIStockUtil.fetchStockChart(ticker,range).then(stats => dispatch(receiveStockChart(stats,ticker)))

// export const fetchIntradayData = (ticker) => (dispatch) => APIStockUtil.fetchIntradayData(ticker)
//     .then(stats => dispatch(receiveIntradayData(stats,ticker)))
export const fetchIntradayData = (ticker) => (dispatch) => APIStockUtil.fetchIntradayData(ticker)
    .then(stats => dispatch(receiveIntradayData(stats,ticker)), 
        () => dispatch(tickerNotFound(ticker))
    )

export const fetch5YrHistoricalData = (ticker) => (dispatch) => APIStockUtil.fetch5YrHistoricalData(ticker).then(stats => dispatch(receiveHistoricalData(stats,ticker)))

export const fetch1YrHistoricalData = (ticker) => (dispatch) => APIStockUtil.fetch1YrHistoricalData(ticker).then(stats => dispatch(receiveHistoricalData(stats,ticker)))

export const fetchStocks = () => (dispatch) => APIStockUtil.fetchStocks().then( stocks => dispatch(receiveStocks(stocks)))