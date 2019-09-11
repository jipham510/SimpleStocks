import * as APIStockUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_COMPANY_INFO = "RECEIVE_COMPANY_INFO";
export const RECEIVE_STOCK_STATS = "RECEIVE_STOCK_STATS";
export const RECEIVE_STOCK_CHART = "RECEIVE_STOCK_CHART";
export const RECEIVE_STOCKS = "RECEIVE_STOCKS";

const receiveStock = (stock) => ({
    type: RECEIVE_STOCK,
    stock
})
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

const receiveStockChart = (chart,ticker) => ({
    type: RECEIVE_STOCK_CHART,
    ticker,
    chart
})

export const fetchStock = (ticker) => (dispatch) => APIStockUtil.fetchStock(ticker).then( stock => dispatch(receiveStock(stock)))

export const fetchCompanyInfo = (ticker) => (dispatch) => APIStockUtil.fetchCompanyInfo(ticker).then(company_info => dispatch(receiveCompanyInfo(company_info,ticker)))

export const fetchStockStats = (ticker) => (dispatch) => APIStockUtil.fetchStockStats(ticker).then(stats => dispatch(receiveStockStats(stats,ticker)))

export const fetchStockChart = (ticker,range) => (dispatch) => APIStockUtil.fetchStockChart(ticker,range).then(stats => dispatch(receiveStockChart(stats,ticker)))

export const fetchStocks = () => (dispatch) => APIStockUtil.fetchStocks().then( stocks => dispatch(receiveStocks(stocks)))