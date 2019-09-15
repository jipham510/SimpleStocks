import React from 'react';
import StockIndexItemContainer from './stock_index_item_container'
class StockIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.fetchStocks();
    }
    render() {
        return (
            <div>
                <ul className="Stock-list">
                <div className="stock-index-header">Owned Stocks, commented out until order table is integrated</div>
                {/* {this.props.stocks.map( stock => 
                    (<StockIndexItemContainer stock={stock} key={stock.ticker} />)
                )} */}
                </ul>
            </div>
        )
    }
}
export default StockIndex;