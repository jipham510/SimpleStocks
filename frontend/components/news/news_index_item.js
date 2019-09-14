
import React from 'react';

const NewsIndexItem = ( props) => {
    return (
        <li >
            <a href={props.article.url} className="news-index-item">
                <div className="article-info"> 
                    <h5>{props.article.title}</h5> 
                    {/* <h5>{props.article.description}</h5>  */}
                </div>
                <img className="article-img" src={props.article.urlToImage} />
            </a>

        </li>
    )
}
export default NewsIndexItem;

// urlToImage, url, title, description