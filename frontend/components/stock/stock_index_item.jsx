
import React from 'react';
import { Link } from 'react-router-dom';
import { parseFloatToDollars } from '../../util/util';


class StockIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.fetchLatestStockPrice(this.props.stock.ticker)
    }
    render(){  
        return(
        <Link to={`/stocks/${this.props.stock.ticker}`}>

            <div className="stock-index-item">
                <div className="stock-index-item-ticker">{this.props.stock.ticker}</div>
                    <div className="stock-index-item-price">{parseFloatToDollars(this.props.stock.price)}</div>
            </div>
        </Link>
        )
    }
}
export default StockIndexItem;