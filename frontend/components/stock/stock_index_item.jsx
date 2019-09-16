
import React from 'react';
import { Link } from 'react-router-dom';
import { parseFloatToDollars } from '../../util/util';


class StockIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.renderShares = this.renderShares.bind(this);
    }
    componentDidMount(){
        this.props.fetchLatestStockPrice(this.props.stock.ticker)
    }

    renderShares(){
        if (this.props.stock.shares) 
        {
            return (
                <div className="stock-index-item-shares">
                    {this.props.stock.shares} shares
                </div>
            )
        }
    }

    render(){  
        return(
        <Link to={`/stocks/${this.props.stock.ticker}`}>

            <div className="stock-index-item">
                <div className="stock-index-item-left-wrapper">
                    <div className="stock-index-item-ticker">
                        {this.props.stock.ticker}
                    </div>
                    {this.renderShares()}
                </div>
                <div className="stock-index-item-price">
                    {parseFloatToDollars(this.props.price)}
                </div>
            </div>
        </Link>
        )
    }
}
export default StockIndexItem;