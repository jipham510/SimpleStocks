import * as APINewsUtil from '../util/news_api_util';

export const RECEIVE_NEWS = "RECEIVE_NEWS";

const receiveNews = (news) => ({
    type: RECEIVE_NEWS,
    news
})

export const fetchNews = () => (dispatch) => APINewsUtil.fetchNews().then(news => dispatch(receiveNews(news)))
export const fetchCompanyNews = (company) => (dispatch) => APINewsUtil.fetchCompanyNews(company).then(news => dispatch(receiveNews(news)))
