import React from 'react';
import StockIndexItemContainer from './stock_index_item_container'
class StockIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // this.props.fetchStocks();
    }
    render() {
        return (
            <div>
                <ul className="Stock-list">
                <div className="stock-index-header">Stocks Owned</div>

                {this.props.stocks.map( stock => 
                    (<StockIndexItemContainer stock={stock} key={stock.ticker} />)
                )}

                {/* {this.props.stocks.map( stock => 
                    (<StockIndexItemContainer stock={stock} key={stock.ticker} />)
                )} */}
                </ul>
            </div>
        )
    }
}
export default StockIndex;