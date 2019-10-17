
import React from 'react';

const NewsIndexItem = ( props) => {
    return (
        <li >
            <a target="_blank" href={props.article.url} className="news-index-item">
                <div className="article-info"> 
                    <h5>{props.article.title}</h5> 
                    <h6>{props.article.description}</h6> 
                </div>
                <img className="article-img" src={props.article.urlToImage} />
            </a>

        </li>
    )
}
export default NewsIndexItem;

// urlToImage, url, title, description