import React from 'react';
import StockIndexItem from './stock_index_item'
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
                {this.props.stocks.map( stock => 
                    (<StockIndexItem stock={stock} key={stock.ticker} />)
                )}
                </ul>
            </div>
        )
    }
}
export default StockIndex;