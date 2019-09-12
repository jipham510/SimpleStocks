
import React from 'react';
import { Link } from 'react-router-dom';
const StockIndexItem = (props) => {

    return ( 
        <Link to={`/stocks/${props.stock.ticker}`}>
            
            <div>{props.stock.ticker } </div>
        </Link>
    )
}
export default StockIndexItem;