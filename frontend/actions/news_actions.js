import * as APINewsUtil from '../util/news_api_util';
import { DEFAULT_ARTICLES } from '../util/news_api_backup';
export const RECEIVE_NEWS = "RECEIVE_NEWS";

const receiveNews = (news) => ({
    type: RECEIVE_NEWS,
    news
})

export const fetchNews = () => (dispatch) =>
  APINewsUtil.fetchNews().then(
    (res) => dispatch(receiveNews(res.articles)),
    (err) => dispatch(receiveNews(DEFAULT_ARTICLES))
  );
export const fetchCompanyNews = (company) => (dispatch) =>
  APINewsUtil.fetchCompanyNews(company).then(
    (res) => dispatch(receiveNews(res.articles)),
    (err) => dispatch(receiveNews(DEFAULT_ARTICLES))
  );
